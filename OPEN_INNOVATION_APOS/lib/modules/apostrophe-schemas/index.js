var joinr = require('joinr');
var _ = require('@sailshq/lodash');
var async = require('async');
var moment = require('moment');
var tinycolor = require('tinycolor2');

module.exports = {
    construct: function (self, options) {
        self.addFieldType({
            name: 'repeat-password',
            validate: function (field, options, warn, fail) {
                !_.find(self.apos.docs.managers[options.subtype].schema, {
                    name: 'password'
                }) ? fail('Campo password non trovato') : {}
            },
            converters: {
                string: function (req, data, name, object, field, callback) {
                    if (data[name]) {
                        object[name] = self.apos.launder.string(data[name], field.def);
                    }
                    return setImmediate(callback);
                },
                form: 'string'
            },
        });


    }
};