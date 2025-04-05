<?php

namespace Drupal\agg_jscss_asyncdefer;

use Drupal\Core\Asset\AssetCollectionGrouperInterface;
use Drupal\Core\Asset\CssCollectionGrouper;

/**
 * Groups CSS assets.
 */
class CssCollectionGrouperAggJscssAsyncdefer extends CssCollectionGrouper implements AssetCollectionGrouperInterface {

  /**
   * {@inheritdoc}
   */
  public function group(array $css_assets) {
    $groups = [];
    $current_group_keys = NULL;
    $i = -1;
    foreach ($css_assets as $item) {

      switch ($item['type']) {
        case 'file':
          $group_keys = $item['preprocess'] ?
            [$item['type'], $item['group'], $item['media'] === 'print'] : FALSE;

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
        $i++;
        $groups[$i] = $item;
        if ($item['media'] !== 'print') {
          $groups[$i]['media'] = 'all';
        }
        unset($groups[$i]['data'], $groups[$i]['weight'], $groups[$i]['basename']);
        $groups[$i]['items'] = [];
        $current_group_keys = $group_keys ? $group_keys : NULL;
      }

      $groups[$i]['items'][] = $item;
    }

    return $groups;
  }

}
