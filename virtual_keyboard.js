(function($, Drupal) {

  Drupal.behaviors.virtual_keyboard = {
    attach: function(context, settings) {
      var include = Drupal.settings.virtual_keyboard.include;
      include += ', .virtual-keyboard-include-children *';
      include += ', .virtual-keyboard-include';

      var exclude = Drupal.settings.virtual_keyboard.exclude;
      exclude += ', .virtual-keyboard-exclude-children *';
      exclude += ', .virtual-keyboard-exclude';

      $(include, context).not(exclude).each(function() {
        textfield = $(this);

        // Check if element is a textfield
        if (!textfield.is('input[type=text], input[type=number], input[type=url], input[type=email], input[type=tel], input[type=password], textarea')) {
          return;
        }

        var trigger = Drupal.theme('virtual_keyboard_trigger', this.id);

        textfield.keyboard({
          openOn: null,
          stayOpen: true
        }).after(trigger);

        $(trigger).click(function() {
          var elementId = this.id.replace('virtual-keyboard-trigger-', '#');
          var keyboard = $(elementId).getkeyboard();
          keyboard.reveal();
          return false;
        });
      });
    }
  }

  Drupal.theme.prototype.virtual_keyboard_trigger = function(targetId) {
    return $('<span></span>')
      .append(Drupal.t('Virtual keyboard'))
      .addClass('virtual-keyboard-trigger')
      .attr('id', 'virtual-keyboard-trigger-' + targetId);
  };

})(jQuery, Drupal);
