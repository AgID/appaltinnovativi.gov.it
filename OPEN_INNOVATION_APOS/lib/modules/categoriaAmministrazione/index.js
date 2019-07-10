module.exports = {
  extend: 'apostrophe-pieces',
  name: 'categoriaAmministrazione',
  label: 'Area tematica',
  pluralLabel: 'Aree tematiche',
  addFields: [{
      name: 'title',
      label: 'Descrizione sintetica',
      type: 'string',
      required: true
    },
    {
      name: 'imgTitle',
      label: 'Nome immagine',
      type: 'string'
    },
    {
      name: 'immagineCategoria',
      label: 'Immagine Categoria',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: 3
      }
    },

  ],
  arrangeField: [{
      name: 'informazioni',
      label: 'Informazioni generali',
      fields: [
        'title'
      ]
    },
    {
      name: 'multimediali',
      label: 'Multimediali',
      fields: [
        'immagineCategoria'
      ]
    },
    {
      name: 'amministrative',
      label: 'Amministrative',
      fields: ['slug',
        'tags',
        'published',
        'tash',
        'imgTitle'
      ]
    }
  ],
  construct: function (self, options) {
    self.beforeSave = function (req, piece, options, callback) {
      piece.imgTitle = getFirstWord(piece.title)
      return callback();
    };

    function getFirstWord(str) {
      var titleArray = str.split(' ');
      return titleArray[0].replace(/^[, ]+|[, ]+$|[, ]+/g, "").toLowerCase()
    }
  }
};