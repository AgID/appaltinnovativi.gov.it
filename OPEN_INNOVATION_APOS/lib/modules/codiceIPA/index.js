module.exports = {
  extend: 'apostrophe-pieces',
  name: 'codiceIPA',
  label: 'codiceIPA',
  pluralLabel: 'codiceIPA',
  afterConstruct: function (self) {
    self.addPermissions = function () {
      self.apos.permissions.add({
        value: 'admin-' + self.name,
        label: 'Admin: ' + self.label
      });
      self.apos.permissions.add({
        value: 'edit-' + self.name,
        label: 'Edit: ' + self.label
      });
      self.apos.permissions.add({
        value: 'submit-' + self.name,
        label: 'Submit: ' + self.label
      });
    };
  },
  addFields: [{
      name: 'title',
      label: 'Codice Organizzazione',
      type: 'string',
      required: true
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'string',
      required: true
    },
    {
      name: 'acronimo',
      label: 'Acronimo',
      type: 'string'
    },
    {
      name: 'comuneDesc',
      label: 'comuneDesc',
      type: 'string'
    },
    {
      name: 'provincia',
      label: 'provincia',
      type: 'string'
    },
    {
      name: 'regione',
      label: 'regione',
      type: 'string'
    },
    {
      name: 'tipologiaIstat',
      label: 'tipologiaIstat',
      type: 'string'
    },
    {
      name: 'tipologiaAmm',
      label: 'tipologiaAmm',
      type: 'string'
    },
    {
      name: 'pec',
      label: 'pec',
      type: 'array',
      titleField: 'email',
      schema: [{
        type: 'string',
        name: 'email',
        label: 'Email'
      }]
    },
    {
      name: 'sito',
      label: 'Sito',
      type: 'string'
    },
  ],
  beforeConstruct: function (self, options) {
    options.defaultColumns = options.defaultColumns || [{
        name: 'title',
        label: 'Title'
      },
      {
        name: 'name',
        label: 'Descrizione',
      },
      {
        name: 'published',
        label: 'Published',
        partial: function (value) {
          return self.partial('managePublished', {
            value: value
          });
        }
      }
    ];
    if (self.contextual) {
      options.defaultColumns.push({
        name: '_url',
        label: 'Link',
        partial: function (value) {
          return self.partial('manageLink', {
            value: value
          });
        }
      });
    }
    options.addColumns = options.defaultColumns.concat(options.addColumns || []);
  },
};