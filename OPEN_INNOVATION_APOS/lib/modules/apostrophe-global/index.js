module.exports = {
  addFields: [{
      name: "privacy",
      type: "string",
      label: "Privacy"
    },
    {
      name: "linkFooter",
      type: "array",
      label: "Link in footer",
      titleField: 'title',
      schema: [{
          name: "title",
          type: "string",
          label: "Titolo"
        },
        {
          name: '_linkPage',
          label: 'Pagina',
          type: 'joinByOne',
          withType: 'apostrophe-page',
          idField: 'pageId',
          required: true,
          filters: {
            projection: {
              title: 1,
              slug: 1,
              type: 1,
              tags: 1,
              _url: 1
            }
          }
        },
      ]
    },
    {
      name: '_linkPageFabbisogno',
      label: 'Bottone Fabbisogno',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      idField: 'pageId',
      filters: {
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          tags: 1,
          _url: 1
        }
      }
    },
    {
      name: "linkHeader",
      type: "array",
      label: "Link in Header",
      titleField: 'title',
      schema: [{
          name: "title",
          type: "string",
          label: "Titolo"
        },
        {
          name: '_linkPage',
          label: 'Pagina',
          type: 'joinByOne',
          withType: 'apostrophe-page',
          idField: 'pageId',
          required: true,
          filters: {
            projection: {
              title: 1,
              slug: 1,
              type: 1,
              tags: 1,
              _url: 1
            }
          }
        },
      ]
    },
    {
      name: "trasmissioneAccetta",
      type: 'object',
      schema: [{
          name: 'text',
          type: 'string',
          label: 'Testo trasmetti'
        },
        {
          name: 'html',
          label: 'Html accetta',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': {
                toolbar: ['Styles', '-', 'Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Scayt', '-',
                  'RemoveFormat', 'SpecialChar', 'Image', 'HorizontalRule', 'Outdent', 'Indent', '-',
                  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                  'Bold', 'Underline', 'Italic', 'Strike', '-',
                  'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'NumberedList', 'Blockquote', 'Split'
                ],
                styles: [{
                    name: 'Title',
                    element: 'h2'
                  },
                  {
                    name: 'Heading',
                    element: 'h3'
                  },
                  {
                    name: 'Subheading',
                    element: 'h4'
                  },
                  {
                    name: 'Paragraph',
                    element: 'p'
                  }
                ]
              }
            }
          }
        }
      ]
    },
    {
      name: "pecPA",
      type: 'object',
      schema: [{
          name: 'text',
          type: 'string',
          label: 'Testo pec pa'
        },
        {
          name: 'html',
          label: 'Html pec pa',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': {
                toolbar: ['Styles', '-', 'Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Scayt', '-',
                  'RemoveFormat', 'SpecialChar', 'Image', 'HorizontalRule', 'Outdent', 'Indent', '-',
                  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                  'Bold', 'Underline', 'Italic', 'Strike', '-',
                  'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'NumberedList', 'Blockquote', 'Split'
                ],
                styles: [{
                    name: 'Title',
                    element: 'h2'
                  },
                  {
                    name: 'Heading',
                    element: 'h3'
                  },
                  {
                    name: 'Subheading',
                    element: 'h4'
                  },
                  {
                    name: 'Paragraph',
                    element: 'p'
                  }
                ]
              }
            }
          }
        }
      ]
    },
    {
      name: "approvazioneAGID",
      type: 'object',
      schema: [{
          name: 'text',
          type: 'string',
          label: 'Testo approva'
        },
        {
          name: 'html',
          label: 'Html approva',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': {
                toolbar: ['Styles', '-', 'Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Scayt', '-',
                  'RemoveFormat', 'SpecialChar', 'Image', 'HorizontalRule', 'Outdent', 'Indent', '-',
                  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                  'Bold', 'Underline', 'Italic', 'Strike', '-',
                  'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'NumberedList', 'Blockquote', 'Split'
                ],
                styles: [{
                    name: 'Title',
                    element: 'h2'
                  },
                  {
                    name: 'Heading',
                    element: 'h3'
                  },
                  {
                    name: 'Subheading',
                    element: 'h4'
                  },
                  {
                    name: 'Paragraph',
                    element: 'p'
                  }
                ]
              }
            }
          }
        }
      ]
    }, {
      name: "rifiutaAGID",
      type: 'object',
      schema: [{
          name: 'text',
          type: 'string',
          label: 'Testo rifiuta'
        },
        {
          name: 'html',
          label: 'Html rifiuta',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': {
                toolbar: ['Styles', '-', 'Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Scayt', '-',
                  'RemoveFormat', 'SpecialChar', 'Image', 'HorizontalRule', 'Outdent', 'Indent', '-',
                  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                  'Bold', 'Underline', 'Italic', 'Strike', '-',
                  'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'NumberedList', 'Blockquote', 'Split'
                ],
                styles: [{
                    name: 'Title',
                    element: 'h2'
                  },
                  {
                    name: 'Heading',
                    element: 'h3'
                  },
                  {
                    name: 'Subheading',
                    element: 'h4'
                  },
                  {
                    name: 'Paragraph',
                    element: 'p'
                  }
                ]
              }
            }
          }
        }
      ]
    },
    {
      name: "accettazionePA",
      type: 'object',
      schema: [{
          name: 'text',
          type: 'string',
          label: 'Testo accetta'
        },
        {
          name: 'html',
          label: 'Html accetta',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': {
                toolbar: ['Styles', '-', 'Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Scayt', '-',
                  'RemoveFormat', 'SpecialChar', 'Image', 'HorizontalRule', 'Outdent', 'Indent', '-',
                  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                  'Bold', 'Underline', 'Italic', 'Strike', '-',
                  'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'NumberedList', 'Blockquote', 'Split'
                ],
                styles: [{
                    name: 'Title',
                    element: 'h2'
                  },
                  {
                    name: 'Heading',
                    element: 'h3'
                  },
                  {
                    name: 'Subheading',
                    element: 'h4'
                  },
                  {
                    name: 'Paragraph',
                    element: 'p'
                  }
                ]
              }
            }
          }
        }
      ]
    },
    {
      name: "rifiutoPA",
      type: 'object',
      schema: [{
          name: 'text',
          type: 'string',
          label: 'Testo rifiuto'
        },
        {
          name: 'html',
          label: 'Html rifiuto',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': {
                toolbar: ['Styles', '-', 'Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Scayt', '-',
                  'RemoveFormat', 'SpecialChar', 'Image', 'HorizontalRule', 'Outdent', 'Indent', '-',
                  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                  'Bold', 'Underline', 'Italic', 'Strike', '-',
                  'Link', 'Unlink', 'Anchor', 'Table', 'BulletedList', 'NumberedList', 'Blockquote', 'Split'
                ],
                styles: [{
                    name: 'Title',
                    element: 'h2'
                  },
                  {
                    name: 'Heading',
                    element: 'h3'
                  },
                  {
                    name: 'Subheading',
                    element: 'h4'
                  },
                  {
                    name: 'Paragraph',
                    element: 'p'
                  }
                ]
              }
            }
          }
        }
      ]
    }
  ],

  arrangeFields: [{
      name: 'Link privacy',
      label: 'Link privacy',
      fields: [
        'privacy'
      ]
    },
    {
      name: 'footer',
      label: 'Footer',
      fields: [
        'linkFooter'
      ]
    },
    {
      name: 'header',
      label: 'Header',
      fields: [
        'linkHeader'
      ]
    },
    {
      name: 'fabbisogno',
      label: 'Bottone fabbisogno',
      fields: [
        '_linkPageFabbisogno'
      ]
    },
    {
      name: 'emailTrasmissione',
      label: 'Testo email Trasmissione',
      fields: [
        'trasmissioneAccetta'
      ]
    },
    {
      name: 'emailApprovazione',
      label: 'Testo email Approvazione AGID',
      fields: [
        'approvazioneAGID',
        'pecPA',
        'rifiutaAGID'
      ]
    },
    {
      name: 'emailAccettazione',
      label: 'Testo email accettazione PA',
      fields: [
        'accettazionePA',
        'rifiutoPA'
      ]
    }
  ]
};