<?php

namespace Drupal\agg_jscss_asyncdefer;

use Drupal\Core\Asset\AssetCollectionGrouperInterface;
use Drupal\Core\Asset\JsCollectionGrouper;

/**
 * Groups JavaScript assets.
 */
class JsCollectionGrouperAggJscssAsyncdefer extends JsCollectionGrouper implements AssetCollectionGrouperInterface {

  /**
   * {@inheritdoc}
   */
  public function group(array $js_assets) {
    $groups = [];
    $current_group_keys = NULL;
    $index = -1;
    foreach ($js_assets as $item) {
      switch ($item['type']) {
        case 'file':
          $group_keys = $item['preprocess'] ? [$item['type'], $item['group']] : FALSE;

          if ($group_keys && !empty($item['attributes'])) {
            foreach (array_keys($item['attributes']) as $attribute_key) {
              if (in_array($attribute_key, ['async', 'defer'])) {
                $group_keys[] = $attribute_key;
              }
              else {
                $group_keys = FALSE;
              }
            }
          }
          break;

        case 'external':
          $group_keys = FALSE;
          break;
      }

      if ($group_keys !== $current_group_keys) {
        $index++;
        $groups[$index] = $item;
        unset($groups[$index]['data'], $groups[$index]['weight']);
        $groups[$index]['items'] = [];
        $current_group_keys = $group_keys ? $group_keys : NULL;
      }

      $groups[$index]['items'][] = $item;
    }

    return $groups;
  }

}
