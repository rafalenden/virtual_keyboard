(function($) {

  Drupal.behaviors.virtual_keyboard = {
    attach: function(context, settings) {
      var include = settings.virtual_keyboard.include;
      if (include) {
        include += ', ';
      }
      include += '.virtual-keyboard-include-children *';
      include += ', .virtual-keyboard-include';
      var exclude = settings.virtual_keyboard.exclude;
      if (exclude) {
        exclude += ', ';
      }
      exclude += '.virtual-keyboard-exclude-children *';
      exclude += ', .virtual-keyboard-exclude';

      $(include, context).not(exclude).each(function() {
        // Set options.
        var options = settings.virtual_keyboard.options;

        $textfield = $(this);

        // Check if element is a textfield.
        if (!$textfield.is('input[type=text], input[type=number], input[type=url], input[type=email], input[type=tel], input[type=password], textarea')) {
          return;
        }

        var trigger = Drupal.theme('virtual_keyboard_trigger', this.id);

        // Show num pad.
        if ($textfield.is('input[type=number], input[type=tel]')) {
          options.layout = 'num';
        }

        // Put cursor at the end of textfield.
        options.visible = function(e, keyboard, el) {
          var content = keyboard.$el.val();
          keyboard.$el.focus().val('').val(content);
        }

        // Is resizable.
        if ($textfield.parent().is('.resizable-textarea')) {
          $textfield.keyboard(options).parent().find('.grippie').after(trigger);
        }
        else {
          $textfield.keyboard(options).after(trigger);
        }

        // Button with keyboard icon is clicked.
        $(trigger).click(function(e) {
          var elementId = this.id.replace('virtual-keyboard-trigger-', '#');
          var keyboard = $(elementId).getkeyboard();
            keyboard.reveal();
        });

      });
    }
  }

  Drupal.theme.prototype.virtual_keyboard_trigger = function(targetId) {
    return $('<span></span>')
      .append(Drupal.t('Virtual Keyboard'))
      .addClass('virtual-keyboard-trigger')
      .attr('id', 'virtual-keyboard-trigger-' + targetId);
  };

})(jQuery);
