<?php

namespace Drupal\agg_jscss_asyncdefer;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderBase;
use Drupal\Core\DependencyInjection\ServiceProviderInterface;

/**
 * Swaps out the core condition manager.
 */
class AggJscssAsyncdeferServiceProvider extends ServiceProviderBase implements ServiceProviderInterface {

  /**
   * {@inheritdoc}
   */
  public function alter(ContainerBuilder $container) {
    $definition_asset_resolver = $container->getDefinition('asset.resolver');
    $definition_asset_resolver->setClass('Drupal\agg_jscss_asyncdefer\AssetResolverAggJscssAsyncdefer');

    $definition_css_grouper = $container->getDefinition('asset.css.collection_grouper');
    $definition_css_grouper->setClass('Drupal\agg_jscss_asyncdefer\CssCollectionGrouperAggJscssAsyncdefer');

    $definition_js_grouper = $container->getDefinition('asset.js.collection_grouper');
    $definition_js_grouper->setClass('Drupal\agg_jscss_asyncdefer\JsCollectionGrouperAggJscssAsyncdefer');
  }

}
