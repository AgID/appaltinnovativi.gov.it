module.exports = {
    extend: 'apostrophe-pieces',
    name: 'statoApertura',
    label: 'Stato Apertura',
    pluralLabel: 'Stati Apertura',
    addFields: [
      {
        name: 'title',
        label: 'Stato apertura',
        type: 'string',
        required: true
      }
    ]
  };