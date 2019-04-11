module.exports = {
    extend: 'apostrophe-pieces',
    name: 'categoriaIPA',
    label: 'Categoria IPA',
    pluralLabel: 'Categorie IPA',
    addFields: [
      {
        name: 'title',
        label: 'Nome',
        type: 'string',
        required: true
      }
    ]
  };