var moment = require('moment')
module.exports = {
    extend: 'apostrophe-pieces',
    name: 'appalti',
    label: 'Appalto',
    pluralLabel: 'Appalti',
    addFields: [{
            name: 'title',
            label: 'Titolo',
            type: 'string',
            required: true
        },
        {
            name: 'description',
            label: 'Abstract Sfida',
            type: 'string',
            required: true
        },
        {
            name: 'dataPubblicazioneBando',
            label: 'Data Pubblicazione Bando',
            help: '(YYYY-MM-DD)',
            type: 'date',
            pikadayOptions: {
                format: 'YYYY-MM-DD',
                firstDay: 1
            }
        },
        {
            name: 'descrizioneSfida',
            label: 'Descrizione Sfida',
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
        },
        {
            name: 'descrizioneGara',
            label: 'Descrizione Gara',
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
        },
        {
            name: 'urlInterni',
            label: 'Collegamenti interni',
            type: 'array',
            titleField: 'description',
            schema: [{
                    name: 'description',
                    label: 'descrizione',
                    type: 'string'
                },
                {
                    name: 'url',
                    label: 'indirizzo',
                    type: 'string'
                }
            ]
        },
        {
            name: 'urlEsterni',
            label: 'Collegamenti esterni',
            type: 'array',
            titleField: 'description',
            schema: [{
                    name: 'description',
                    label: 'descrizione',
                    type: 'string'
                },
                {
                    name: 'url',
                    label: 'indirizzo',
                    type: 'string'
                }
            ]
        },
        {
            name: 'immagineScheda',
            label: 'Immagine Scheda',
            type: 'singleton',
            widgetType: 'apostrophe-images',
            options: {
                limit: 1
            }
        },
        {
            name: 'imgGallery',
            label: 'Galleria',
            type: 'singleton',
            widgetType: 'apostrophe-images',
            options: {}
        },
        {
            name: 'keywords',
            label: 'Keywords',
            type: 'array',
            titleField: 'keyword',
            schema: [{
                type: 'string',
                name: 'keyword',
                label: 'Keyword'
            }]
        },
        {
            name: '_fasciaImporto',
            withType: 'fasciaImporto',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1
                }
            }
        },
        {
            name: 'valoreEffettivo',
            label: 'Valore effettivo',
            type: 'string'
        },
        {
            name: '_tipologiaProcedura',
            withType: 'tipologiaProcedura',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1
                }
            }
        },
        {
            name: '_statoApertura',
            withType: 'statoApertura',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1
                }
            }
        },
        {
            name: '_codiceIPAProponente',
            withType: 'codiceIPA',
            type: 'joinByOne',
            required: true,
            filters: {
                projection: {
                    title: 1,
                    acronimo: 1,
                    name: 1,
                    slug: 1
                }
            }
        },
        {
            name: '_categoriaIPAProponente',
            withType: 'categoriaIPA',
            type: 'joinByOne',
            required: true,
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1
                }
            }
        },
        {
            name: '_categoriaAmministrazioneProponente',
            withType: 'categoriaAmministrazione',
            type: 'joinByOne',
            required: true,
            filters: {
                projection: {
                    title: 1,
                    description: 1,
                    slug: 1,
                    immagineCategoria: 1,
                    imgTitle: 1,
                    type: 1
                }
            }
        },
        {
            name: '_codiceIPAAppaltante',
            withType: 'codiceIPA',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    name: 1,
                    slug: 1
                }
            }
        },
        {
            name: 'descrizioneAlternativaAppaltante',
            type: 'string',
            label: 'Descrizione Alternativa Amministrazione Appaltante (da inserire solo se non appartenente al catalogo IPA)'
        },
        {
            name: '_categoriaIPAAppaltante',
            withType: 'categoriaIPA',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    slug: 1,
                    type: 1
                }
            }
        },
        {
            name: '_categoriaAmministrazioneAppaltante',
            withType: 'categoriaAmministrazione',
            type: 'joinByOne',
            filters: {
                projection: {
                    title: 1,
                    description: 1,
                    slug: 1,
                    immagineCategoria: 1,
                    type: 1
                }
            }
        }
    ],
    arrangeFields: [{
            name: 'informazioni',
            label: 'Informazioni generali',
            fields: [
                'title',
                'description',
                'dataPubblicazioneBando',
                'descrizioneSfida',
                'descrizioneGara',
                'keywords',
                '_tipologiaProcedura',
                '_statoApertura'
            ]
        },
        {
            name: 'ammProp',
            label: 'Amministrazione Proponente',
            fields: [
                '_codiceIPAProponente',
                '_categoriaIPAProponente',
                '_categoriaAmministrazioneProponente'
            ]
        },
        {
            name: 'ammApp',
            label: 'Amministrazione Appaltante',
            fields: [
                '_codiceIPAAppaltante',
                '_categoriaIPAAppaltante',
                '_categoriaAmministrazioneAppaltante',
                'descrizioneAlternativaAppaltante'
            ]
        },
        {
            name: 'valore',
            label: 'Valore gara',
            fields: [
                '_fasciaImporto',
                'valoreEffettivo'
            ]
        },
        {
            name: 'collegamenti',
            label: 'Collegamenti',
            fields: [
                'urlInterni',
                'urlEsterni'
            ]
        },
        {
            name: 'informazioniMultimediali',
            label: 'Informazioni multimediali',
            fields: [
                'immagineScheda',
                'imgGallery'
            ]
        },
        {
            name: 'amministrative',
            label: 'Amministrative',
            fields: ['slug', 'tags', 'published', 'tash']
        }
    ],
    // construct: function (self, options) {

    // }
};