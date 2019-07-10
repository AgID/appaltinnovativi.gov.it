module.exports = {
    // groups: [{
    //         title: 'guest',
    //         permissions: []
    //     },
    //     {
    //         title: 'admin',
    //         permissions: ['admin']
    //     },
    //     {
    //         title: 'edit',
    //         permissions: ['edit']
    //     }
    // ],
    // addFields: [{
    //         label: 'Codice fiscale',
    //         name: 'cf',
    //         type: 'string',
    //         required: true
    //     },
    //     {
    //         label: 'Ripeti password',
    //         name: 'repeat-password',
    //         type: 'repeat-password',
    //         required: true
    //     }
    //],
    beforeConstruct: function (self, options) {
        options.addFields = [{
                label: 'Codice fiscale',
                name: 'cf',
                type: 'string',
                required: true
            },
            {
                label: 'Conferma password',
                name: 'repeat-password',
                type: 'repeat-password'
            },
            {
                label: 'Privacy',
                help: "Letto e compresa l'informativa, acconsento al trattamento dei miei dati personali ai sensi del Reg.(UE) 2016 / 679 del parlamento europeo e del consiglio e del D.lgs 196 / 2003 ss.mm.ii",
                name: 'privacy',
                type: 'boolean',
                required: true
            },

            // {
            //     label: 'Tipologia Organizzazione',
            //     name: 'tipoOrganizzazione',
            //     type: 'select',
            //     required: true,
            //     choices: [{
            //             label: 'PA',
            //             value: 'pa',
            //         },
            //         {
            //             label: 'Impresa',
            //             value: 'i'
            //         },
            //         {
            //             label: 'Libero professionista',
            //             value: 'lp'
            //         },
            //         {
            //             label: 'Cittadino',
            //             value: 'c'
            //         }
            //     ]
            // },
            // {
            //     label: 'Denominazione organizzaione',
            //     name: 'denominazioneOrganizzazione',
            //     type: 'string',
            //     required: true
            // }
        ].concat(options.addFields || [])
    },
    construct: function (self, options) {
        options.arrangeFields = [{
            name: 'basics',
            label: 'Basics',
            fields: ['firstName',
                'lastName',
                'title',
                'username',
                'email',
                'password',
                'repeat-password',
                'slug',
                'group',
                '_groups',
                'disabled',
                'slug',
                'cf',
                'privacy',
                'tipoOrganizzazione',
                'denominazioneOrganizzazione'
            ]
        }]
    }
};