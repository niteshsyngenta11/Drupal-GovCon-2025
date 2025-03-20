<?php

namespace Drupal\govcon_custom\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Configure footer settings for this site.
 */
class FooterSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['govcon_custom.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'govcon_footer_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('govcon_custom.settings');
    
    $form['footer_left'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Footer Left'),
    ];
    $form['footer_left']['footer_image'] = [
      '#type' => 'managed_file',
      '#title' => $this->t('Footer Logo'),
      '#description' => $this->t('Upload a footer logo. Allowed file types: jpg, jpeg, png, webp.'),
      '#default_value' => $config->get('footer_image') ? [(int) $config->get('footer_image')] : [],
      '#upload_location' => 'public://',
      '#required' => FALSE,
    ];
    $form['footer_right'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Footer Right'),
    ];
    $form['footer_right']['footer_description'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Description'),
      '#description' => $this->t('Enter footer description.'),
      '#default_value' => $config->get('footer_description') ?? '',
      '#required' => TRUE,
    ];
    $form['footer_right']['footer_cta'] = [
      '#type' => 'details',
      '#title' => $this->t('Footer CTA'),
      '#open' => TRUE,
    ];
    $form['footer_right']['footer_cta']['footer_cta_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('CTA Button Label'),
      '#default_value' => $config->get('footer_cta_label') ?? '',
      '#required' => TRUE,
    ];
    $form['footer_right']['footer_cta']['footer_cta_url'] = [
      '#type' => 'linkit',
      '#title' => $this->t('CTA Button URL'),
      '#description' => $this->t('Start typing to see a list of results. Click to select.'),
      '#autocomplete_route_name' => 'linkit.autocomplete',
      '#autocomplete_route_parameters' => [
        'linkit_profile_id' => 'default',
      ],
      '#default_value' => $config->get('footer_cta_url') ?? '',
      '#required' => TRUE,
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $fid = $form_state->getValue('footer_image');
    $file_id = !empty($fid) ? (int) reset($fid) : NULL;
    if ($file_id && ($file = File::load($file_id))) {
      $file->setPermanent();
      $file->save();
    }

    $this->config('govcon_custom.settings')
      ->set('footer_image', $file_id)
      ->set('footer_description', $form_state->getValue('footer_description'))
      ->set('footer_cta_label', $form_state->getValue('footer_cta_label'))
      ->set('footer_cta_url', $form_state->getValue('footer_cta_url'))
      ->save();

    parent::submitForm($form, $form_state);
  }
}
