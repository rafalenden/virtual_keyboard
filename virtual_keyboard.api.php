<?php

/**
 * @file
 * Documents API functions for Virtual Keyboard module.
 */

/**
 * Alter the options used by Virtual Keyboard plugin.
 */
function hook_virtual_keyboard_options_alter(&$options) {
  // Use custom layout.
  $options['layout'] = 'custom';
  $options['customLayout'] = array(
    'default' => array(
      'C D E F',
      '8 9 A B',
      '4 5 6 7',
      '0 1 2 3',
      '{bksp} {a} {c}'
    ),
  );
}
