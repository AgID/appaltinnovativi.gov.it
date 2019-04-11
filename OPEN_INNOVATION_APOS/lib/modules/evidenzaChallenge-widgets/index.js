module.exports = {
    extend: 'apostrophe-widgets',
    label: 'In evidenza',
    defer: true,
    playerData: ['_fasciaImporto'],
    addFields: [{
        name: '_item',
        label: 'Selezione evidenza',
        // This is optional since the name of our join matches the name of the
        // other type, if the names don't match it is mandatory
        // withType: ['appalti', 'consultazioni', 'sfide'],
        withType: ['appalti', 'consultazioni', 'fabbisogni'],
        withJoins: [
            '_fasciaImporto',
            '_tipologiaProcedura',
            '_statoApertura',
            '_codiceIPAProponente',
            '_categoriaAmministrazioneProponente',
            '_codiceIPAAppaltante'
        ],
        type: 'joinByArray'
    }]
};