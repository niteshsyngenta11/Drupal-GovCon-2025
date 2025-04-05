<?php

declare(strict_types = 1);

namespace Drupal\agg_jscss_asyncdefer\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configure Aggregation JS CSS async defer settings for this site.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * The library discovery service.
   *
   * @var \Drupal\Core\Asset\LibraryDiscoveryInterface
   */
  protected $libraryDiscovery;

  /**
   * The module handler.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * The theme handler.
   *
   * @var \Drupal\Core\Extension\ThemeHandlerInterface
   */
  protected $themeHandler;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): SettingsForm|ConfigFormBase {
    $instance = parent::create($container);
    $instance->libraryDiscovery = $container->get('library.discovery');
    $instance->moduleHandler = $container->get('module_handler');
    $instance->themeHandler = $container->get('theme_handler');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'agg_jscss_asyncdefer_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return ['agg_jscss_asyncdefer.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {

    $config = $this->config('agg_jscss_asyncdefer.settings');
    $libraries = $config->get('libraries');
    $libraries ??= [];

    $form['configuration_all']['js_all'] = [
      '#type' => 'radios',
      '#title' => $this->t('Force all JS'),
      '#default_value' => $config->get('js_all') ?? 'none',
      '#options' => $this->getOptions(),
    ];

    $form['configuration_all']['css_all'] = [
      '#type' => 'radios',
      '#title' => $this->t('Force all CSS'),
      '#default_value' => $config->get('css_all') ?? 'none',
      '#options' => $this->getOptions(),
    ];

    $libraries_core = $this->libraryDiscovery->getLibrariesByExtension('core');

    $form['configuration_core'] = [
      '#type' => 'details',
      '#title' => 'Core Libraries',
      '#open' => FALSE,
    ];

    foreach ($libraries_core as $library_name => $library) {

      $library_name_field = str_replace('.', '_lib_', $library_name);

      $default_value = array_key_first(array_filter($libraries, fn($array) => in_array("core/$library_name", $array)));
      $form['configuration_core']["core/$library_name_field"] = [
        '#type' => 'radios',
        '#title' => $library_name,
        '#default_value' => $default_value ?? 'none',
        '#options' => $this->getOptions(),
      ];

    }

    $modules = $this->moduleHandler->getModuleList();

    $form['configuration_modules'] = [
      '#type' => 'details',
      '#title' => 'Modules Libraries',
      '#open' => FALSE,
    ];

    foreach ($modules as $module_name => $module) {
      $libraries_modules = $this->libraryDiscovery->getLibrariesByExtension($module_name);
      if (empty($libraries_modules)) {
        continue;
      }
      $form['configuration_modules'][$module_name] = [
        '#type' => 'fieldset',
        '#title' => $module_name . ' Libraries',
        '#open' => FALSE,
      ];
      foreach ($libraries_modules as $library_name => $library) {
        $library_name_field = str_replace('.', '_lib_', $library_name);

        $default_value = array_key_first(array_filter($libraries, fn($array) => in_array("$module_name/$library_name", $array)));
        $form['configuration_modules'][$module_name]["$module_name/$library_name_field"] = [
          '#type' => 'radios',
          '#title' => $library_name,
          '#default_value' => $default_value ?? 'none',
          '#options' => $this->getOptions(),
        ];
      }
    }

    $public_theme_name = $this->config('system.theme')->get('default');

    $libraries_theme = $this->libraryDiscovery->getLibrariesByExtension($public_theme_name);
    $public_theme = $this->themeHandler->getTheme($public_theme_name)->info;

    $form['configuration_theme'] = [
      '#type' => 'details',
      '#title' => $public_theme['name'] . ' Theme Libraries',
      '#open' => FALSE,
    ];

    foreach ($libraries_theme as $library_name => $library) {
      $library_name_field = str_replace('.', '_lib_', $library_name);

      $default_value = array_key_first(array_filter($libraries, fn($array) => in_array("$public_theme_name/$library_name", $array)));
      $form['configuration_theme']["$public_theme_name/$library_name_field"] = [
        '#type' => 'radios',
        '#title' => $library_name,
        '#default_value' => $default_value ?? 'none',
        '#options' => $this->getOptions(),
      ];

    }

    if (isset($public_theme['base theme'])) {
      $libraries_base_theme = $this->libraryDiscovery->getLibrariesByExtension($public_theme['base theme']);
      $form['configuration_base_theme'] = [
        '#type' => 'details',
        '#title' => $public_theme['base theme'] . ' Theme Libraries',
        '#open' => FALSE,
      ];

      foreach ($libraries_base_theme as $library_name => $library) {
        $library_name_field = str_replace('.', '_lib_', $library_name);

        $default_value = array_key_first(array_filter($libraries, fn($array) => in_array($public_theme['base theme'] . '/' . $library_name, $array)));
        $form['configuration_base_theme'][$public_theme['base theme'] . '/' . $library_name_field] = [
          '#type' => 'radios',
          '#title' => $library_name,
          '#default_value' => $default_value ?? 'none',
          '#options' => $this->getOptions(),
        ];

      }
    }
    $form['#attached']['library'][] = 'agg_jscss_asyncdefer/form';

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $results = $form_state->getValues();

    $values_selected = array_filter($results, fn($value) => $value === "async" || $value === "defer");
    $values_format = [];
    array_walk($values_selected, function($value, $key) use (&$values_format) {
      $new_key = str_replace('_lib_', '.', $key);
      $values_format[$new_key] = $value;
    });

    $values_result = array_reduce(array_keys($values_format), function($result, $key) use ($values_format) {
      $value = $values_format[$key];
      $result[$value][] = $key;
      return $result;
    }, []);


    $config = $this->config('agg_jscss_asyncdefer.settings');
    $config->set('js_all', $form_state->getValue('js_all'))
      ->set('css_all', $form_state->getValue('css_all'))
      ->set('libraries', $values_result)
      ->save();
    parent::submitForm($form, $form_state);
  }

  /**
   * Get options for select.
   *
   * @return array
   *  Options for select.
   */
  private function getOptions(): array
  {
    return [
      'none' => $this->t('None'),
      'async' => $this->t('Async'),
      'defer' => $this->t('Defer'),
    ];
  }

}
