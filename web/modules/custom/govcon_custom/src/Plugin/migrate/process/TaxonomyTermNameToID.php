<?php

namespace Drupal\govcon_custom\Plugin\migrate\process;

use Drupal\taxonomy\Entity\Term;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;
use Drupal\Core\Entity\EntityStorageException;

/**
 * Maps a taxonomy term name to its term ID or creates the term if it doesn't exist.
 *
 * @MigrateProcessPlugin(
 *   id = "taxonomy_term_name_to_id"
 * )
 */
class TaxonomyTermNameToID extends ProcessPluginBase {

  /**
   * Transforms the taxonomy term name into an ID.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (empty($value)) {
      return NULL;
    }

    // Define the vocabulary machine name.
    $vocabulary = 'conference_year'; // Change this to match your vocabulary.

    // Check if the term already exists.
    $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties([
      'name' => $value,
      'vid' => $vocabulary,
    ]);

    if (!empty($terms)) {
      $term = reset($terms);
      return $term->id();
    }

    // Create a new term if it doesn't exist.
    try {
      $term = Term::create([
        'name' => $value,
        'vid' => $vocabulary,
      ]);
      $term->save();
      return $term->id();
    }
    catch (EntityStorageException $e) {
      \Drupal::logger('govcon_custom')->error('Failed to create taxonomy term: @message', ['@message' => $e->getMessage()]);
    }

    return NULL;
  }
}
