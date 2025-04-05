<?php

namespace Drupal\agg_jscss_asyncdefer;

use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\NestedArray;
use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Asset\AssetResolver;
use Drupal\Core\Asset\AssetResolverInterface;
use Drupal\Core\Asset\AttachedAssetsInterface;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Language\LanguageInterface;

/**
 * The modified asset resolver to add async/defer attribute.
 */
class AssetResolverAggJscssAsyncdefer extends AssetResolver implements AssetResolverInterface {

  /**
   * {@inheritdoc}
   */
  public function getCssAssets(AttachedAssetsInterface $assets, $optimize, ?LanguageInterface $language = NULL) {
    if (!$assets->getLibraries()) {
      return [];
    }
    $libraries_to_load = $this->getLibrariesToLoad($assets);
    foreach ($libraries_to_load as $key => $library) {
      [$extension, $name] = explode('/', $library, 2);
      $definition = $this->libraryDiscovery->getLibraryByName($extension, $name);
      if (empty($definition['css'])) {
        unset($libraries_to_load[$key]);
      }
    }
    $libraries_to_load = array_values($libraries_to_load);
    if (!$libraries_to_load) {
      return [];
    }
    if (!isset($language)) {
      $language = $this->languageManager->getCurrentLanguage();
    }
    $theme_info = $this->themeManager->getActiveTheme();
    $libraries_to_load = $this->getLibrariesToLoad($assets);
    $cid = 'css:' . $theme_info->getName() . ':' . $language->getId() . Crypt::hashBase64(serialize($libraries_to_load)) . (int) $optimize;
    if ($cached = $this->cache->get($cid)) {
      return $cached->data;
    }

    $css = [];
    $default_options = [
      'type' => 'file',
      'group' => CSS_AGGREGATE_DEFAULT,
      'weight' => 0,
      'media' => 'all',
      'preprocess' => TRUE,
    ];

    $config = \Drupal::config('agg_jscss_asyncdefer.settings');

    $libraries = $config->get('libraries');
    $css_all = $config->get('css_all');

    foreach ($libraries_to_load as $library) {
      [$extension, $name] = explode('/', $library, 2);
      $definition = $this->libraryDiscovery->getLibraryByName($extension, $name);
      if (isset($definition['css'])) {
        foreach ($definition['css'] as $options) {
          $options += $default_options;
          $options['license'] = $definition['license'];

          if ($css_all !== 'none') {
            $options['attributes'][$css_all] = TRUE;
          }

          $check_async = $libraries['async'] ?? FALSE;
          if ($check_async && in_array($library, $libraries['async']) && $css_all !== 'defer') {
            $options['attributes']['async'] = TRUE;
          }

          $check_defer = $libraries['defer'] ?? FALSE;
          if ($check_defer && in_array($library, $libraries['defer']) && $css_all !== 'async') {
            $options['attributes']['defer'] = TRUE;
          }

          $options['preprocess'] = (empty($options['attributes']) ||
            count(\array_diff_key(
                $options['attributes'], ['async' => TRUE, 'defer' => TRUE])
            ) === 0
          ) ? $options['preprocess'] : FALSE;

          $options['weight'] += count($css) / 30000;
          $css[$options['data']] = $options;
        }
      }
    }

    // Allow modules and themes to alter the CSS assets.
    $this->moduleHandler->alter('css', $css, $assets, $language);
    $this->themeManager->alter('css', $css, $assets, $language);

    if (!empty($css)) {
      uasort($css, [static::class, 'sort']);

      if ($optimize) {
        $css = \Drupal::service('asset.css.collection_optimizer')->optimize($css, array_values($libraries_to_load), $language);
      }
    }
    $this->cache->set($cid, $css, CacheBackendInterface::CACHE_PERMANENT, ['library_info']);

    return $css;
  }

  /**
   * {@inheritdoc}
   */
  public function getJsAssets(AttachedAssetsInterface $assets, $optimize, LanguageInterface $language = NULL): array {
    if (!$assets->getLibraries() && !$assets->getSettings()) {
      return [[], []];
    }
    if (!isset($language)) {
      $language = $this->languageManager->getCurrentLanguage();
    }
    $theme_info = $this->themeManager->getActiveTheme();
    $libraries_to_load = $this->getLibrariesToLoad($assets);
    $header_js_libraries = [];
    foreach ($libraries_to_load as $key => $library) {
      [$extension, $name] = explode('/', $library, 2);
      $definition = $this->libraryDiscovery->getLibraryByName($extension, $name);
      if (empty($definition['js'])) {
        unset($libraries_to_load[$key]);
        continue;
      }
      if (!empty($definition['header'])) {
        $header_js_libraries[] = $library;
      }
    }
    $libraries_to_load = array_values($libraries_to_load);

    // If all the libraries to load contained only CSS, there is nothing further
    // to do here, so return early.
    if (!$libraries_to_load && !$assets->getSettings()) {
      return [[], []];
    }
    $cid = 'js:' . $theme_info->getName() . ':' . $language->getId() . ':' . Crypt::hashBase64(serialize($libraries_to_load)) . (int) (count($assets->getSettings()) > 0) . (int) $optimize;

    if ($cached = $this->cache->get($cid)) {
      [$js_assets_header, $js_assets_footer, $settings, $settings_in_header] = $cached->data;
    }
    else {
      $javascript = [];
      $default_options = [
        'type' => 'file',
        'group' => JS_DEFAULT,
        'weight' => 0,
        'cache' => TRUE,
        'preprocess' => TRUE,
        'attributes' => [],
        'version' => NULL,
      ];

      $header_js_libraries = [];
      foreach ($libraries_to_load as $library) {
        [$extension, $name] = explode('/', $library, 2);
        $definition = $this->libraryDiscovery->getLibraryByName($extension, $name);
        if (isset($definition['js']) && !empty($definition['header'])) {
          $header_js_libraries[] = $library;
        }
      }

      $header_js_libraries = $this->libraryDependencyResolver->getLibrariesWithDependencies($header_js_libraries);

      $config = \Drupal::config('agg_jscss_asyncdefer.settings');
      $libraries = $config->get('libraries');
      $js_all = $config->get('js_all');

      foreach ($libraries_to_load as $library) {
        [$extension, $name] = explode('/', $library, 2);
        $definition = $this->libraryDiscovery->getLibraryByName($extension, $name);
        if (isset($definition['js'])) {
          foreach ($definition['js'] as $options) {
            $options += $default_options;
            $options['license'] = $definition['license'];

            $options['scope'] = in_array($library, $header_js_libraries) ? 'header' : 'footer';

            if ($js_all !== 'none') {
              $options['attributes'][$js_all] = TRUE;
            }

            $check_async = $libraries['async'] ?? FALSE;
            if ($check_async && in_array($library, $libraries['async']) && $js_all !== 'defer') {
              $options['attributes']['async'] = TRUE;
            }

            $check_defer = $libraries['defer'] ?? FALSE;
            if ($check_defer && in_array($library, $libraries['defer']) && $js_all !== 'async') {
              $options['attributes']['defer'] = TRUE;
            }

            $options['preprocess'] = $options['cache'] && (
              empty($options['attributes']) ||
              count(\array_diff_key(
                  $options['attributes'], ['async' => TRUE, 'defer' => TRUE])
              ) === 0
            ) ? $options['preprocess'] : FALSE;

            $options['weight'] += count($javascript) / 30000;
            $javascript[$options['data']] = $options;
          }
        }
      }

      $this->moduleHandler->alter('js', $javascript, $assets, $language);
      $this->themeManager->alter('js', $javascript, $assets, $language);

      uasort($javascript, [static::class, 'sort']);

      $js_assets_header = [];
      $js_assets_footer = [];
      foreach ($javascript as $key => $item) {
        if ($item['scope'] == 'header') {
          $js_assets_header[$key] = $item;
        }
        elseif ($item['scope'] == 'footer') {
          $js_assets_footer[$key] = $item;
        }
      }

      if ($optimize) {
        $collection_optimizer = \Drupal::service('asset.js.collection_optimizer');
        $js_assets_header = $collection_optimizer->optimize($js_assets_header, $libraries_to_load);
        $js_assets_footer = $collection_optimizer->optimize($js_assets_footer, $libraries_to_load);
      }

      $libraries_to_load = $this->getLibrariesToLoad($assets);
      $settings_required = in_array('core/drupalSettings', $libraries_to_load) || in_array('core/drupalSettings', $this->libraryDependencyResolver->getLibrariesWithDependencies($assets->getAlreadyLoadedLibraries()));
      $settings_have_changed = count($libraries_to_load) > 0 || count($assets->getSettings()) > 0;

      $settings = FALSE;
      if ($settings_required && $settings_have_changed) {
        $settings = $this->getJsSettingsAssets($assets);
        $this->moduleHandler->invokeAllWith('js_settings_build', function (callable $hook, string $module) use (&$settings, $assets) {
          $hook($settings, $assets);
        });
      }
      $settings_in_header = in_array('core/drupalSettings', $header_js_libraries);
      $this->cache->set($cid, [
        $js_assets_header,
        $js_assets_footer,
        $settings, $settings_in_header
      ], CacheBackendInterface::CACHE_PERMANENT, ['library_info']);
    }

    if ($settings !== FALSE) {
      $settings = NestedArray::mergeDeepArray([
        $settings, $assets->getSettings(),
      ], TRUE);
      $this->moduleHandler->alter('js_settings', $settings, $assets);
      $this->themeManager->alter('js_settings', $settings, $assets);
      $assets->setSettings($settings);

      if (isset($settings['ajaxPageState']['libraries'])) {
        $settings['ajaxPageState']['libraries'] = UrlHelper::compressQueryParameter($settings['ajaxPageState']['libraries']);
      }
      $settings_as_inline_javascript = [
        'type' => 'setting',
        'group' => JS_SETTING,
        'weight' => 0,
        'data' => $settings,
      ];
      $settings_js_asset = ['drupalSettings' => $settings_as_inline_javascript];
      if ($settings_in_header) {
        $js_assets_header = $settings_js_asset + $js_assets_header;
      }
      else {
        $js_assets_footer = $settings_js_asset + $js_assets_footer;
      }
    }
    return [
      $js_assets_header,
      $js_assets_footer,
    ];
  }

}
