(function($, Drupal) {

  Drupal.behaviors.screen_keyboard = {
    attach: function(context, settings) {
      var include = Drupal.settings.screen_keyboard.include;
      include += ', .screen-keyboard-include-children *';
      include += ', .screen-keyboard-include';

      var exclude = Drupal.settings.screen_keyboard.exclude;
      exclude += ', .screen-keyboard-exclude-children *';
      exclude += ', .screen-keyboard-exclude';

      $(include, context).not(exclude).each(function() {
        textfield = $(this);

        // Check if element is a textfield
        if (!textfield.is('input[type=text], input[type=number], input[type=url], input[type=email], input[type=tel], input[type=password], textarea')) {
          return;
        }

        var trigger = Drupal.theme('screen_keyboard_trigger', this.id);

        textfield.keyboard({
          openOn: null,
          stayOpen: true
        }).after(trigger);

        $(trigger).click(function() {
          var elementId = this.id.replace('screen-keyboard-trigger-', '#');
          var keyboard = $(elementId).getkeyboard();
          keyboard.reveal();
          return false;
        });
      });
    }
  }

  Drupal.theme.prototype.screen_keyboard_trigger = function(targetId) {
    return $('<span></span>')
      .append(Drupal.t('Screen keyboard'))
      .addClass('screen-keyboard-trigger')
      .attr('id', 'screen-keyboard-trigger-' + targetId);
  };

})(jQuery, Drupal);
