// The browser-side singleton corresponding to the [apostrophe-schemas](index.html) module.

apos.define('apostrophe-schemas', {

  construct: function (self, options) {
    self.convertPassword = function (data, name, $field, $el, field, callback) {
      var err;
      var repeatPassword = $field.val();
      //required
      if (field.required && (!(repeatPassword && repeatPassword.length))) {
        err = self.error(field, 'required');
        return setImmediate(_.partial(callback, err));
      }
      //equals
      if (repeatPassword != data['password']) {
        err = self.error(field, 'invalid');
        return setImmediate(_.partial(callback, err));
      }
      return setImmediate(callback);
    }

    self.populatePassword = function (data, name, $field, $el, field, callback) {
      return setImmediate(callback);
    }
    self.addFieldType({
      name: 'repeat-password',
      populate: self.populatePassword,
      convert: self.convertPassword
    });

    self.addFieldType({
      name: 'boolean',
      populate: function (data, name, $field, $el, field, callback) {
        var href = document.createElement('a')
        $(href).attr('href', $("#textLinkPrivacy").html())
        $(href).html('Privacy')
        $field.parent().parent().find('.apos-field-help').append('<br>')
        $field.parent().parent().find('.apos-field-help').append($(href))
        if (data[name] === true || data[name] === '1') {
          $field.val('1');
        } else {
          $field.val('0');
        }
        self.enableShowFields(data, name, $field, $el, field);
        return setImmediate(callback);
      },
      convert: function (data, name, $field, $el, field, callback) {
        data[name] = $field.val();
        // Seems odd but sometimes used to mandate an "I agree" box
        if (field.required && data[name] === '0') {
          return setImmediate(_.partial(callback, 'required'));
        }
        return setImmediate(callback);
      }
    });

  }
});