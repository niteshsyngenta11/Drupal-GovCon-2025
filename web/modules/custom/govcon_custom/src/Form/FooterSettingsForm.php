<?php

namespace Drupal\govcon_custom\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\node\Entity\Node;

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
      '#type' => 'textfield',
      '#title' => $this->t('CTA Button URL'),
      '#description' => $this->t('Enter either a relative path (/<lorem-ipsum></lorem-ipsum>) or an absolute URL (<https://lorem-ipsum.com>).'),
      '#default_value' => $config->get('footer_cta_url') ?? '',
      '#required' => TRUE,
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * Validate the given URL based on specified rules
   *
   * @param string $url
   *   The URL to validate.
   *
   * @return bool
   *   TRUE if the URL is valid, FALSE otherwise.
   */
  private function isValidUrl(string $url): bool {
    if (filter_var($url, FILTER_VALIDATE_URL)) {
      return TRUE;
    }
    if (strpos($url, '/') === 0) {
      if (\Drupal::service('path.validator')->isValid($url)) {
        return TRUE;
      }
      if (preg_match('/^\/node\/(\d+)$/', $url, $matches) && Node::load($matches[1])) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // Validate CTA URL.
    $url = trim($form_state->getValue('footer_cta_url'));
    if (!$this->isValidUrl($url)) {
      $form_state->setErrorByName('footer_cta_url', $this->t('Invalid URL.'));
    }
    // Validate uploaded file.
    $fid = $form_state->getValue('footer_image');
    if (!empty($fid[0]) && ($file = File::load($fid[0]))) {
      $allowed_mime_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!in_array($file->getMimeType(), $allowed_mime_types)) {
        $form_state->setErrorByName('footer_image', $this->t('Only PNG, JPG, JPEG, and WEBP files are allowed.'));
      }
    } else {
      $form_state->setErrorByName('footer_image', $this->t('Invalid or missing file upload!'));
    }
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
