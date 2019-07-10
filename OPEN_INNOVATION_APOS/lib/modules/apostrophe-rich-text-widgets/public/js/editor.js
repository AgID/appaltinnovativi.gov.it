apos.define('apostrophe-rich-text-widgets-editor', {
    construct: function (self, options) {
        self.beforeCkeditorInline = function (a, b) {
            self.config.skin = 'moono-lisa';
        };
    }
});