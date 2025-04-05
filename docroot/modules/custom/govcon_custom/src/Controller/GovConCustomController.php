<?php

namespace Drupal\govcon_custom\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller for the GovCon Custom admin section.
 */
class GovConCustomController extends ControllerBase {

  /**
   * Overview page for GovCon Custom settings.
   */
  public function overview() {
    return [
      '#markup' => $this->t('<p>Welcome to GovCon Custom settings. Choose a category to configure.</p>'),
    ];
  }

}
