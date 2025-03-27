<?php

/**
 * @file
 * Execute Database updates.
 */

echo "Running database updates...\n";
passthru('drush updb -y');
echo "Database update complete.\n";
