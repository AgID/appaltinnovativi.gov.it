var path = require('path');
require('dotenv').config();
var _ = require('lodash');
var apos = require('apostrophe');
var modulesProd = process.env.ENVIRONMENT === "PRODUCTION" ? require('./production.js') : {};
var modules = {
  'apostrophe-db': {
    uri: process.env.MONGOURL
  },
  'apostrophe-admin-bar': {
    openOnLoad: false,
    openOnHomepageLoad: false,
    groups: [{
        label: "Tipologiche",
        items: ['categoriaAmministrazione',
          'categoriaIPA',
          'codiceIPA',
          'fasciaImporto',
          'statoApertura',
          'tipologiaProcedura'
        ]
      },
      {
        label: "Amministrative",
        items: ['apostrophe-tags',
          'apostrophe-global',
          'apostrophe-pages',
          'apostrophe-users',
          'apostrophe-images',
          'apostrophe-files',
        ]
      }
    ]
  },
  'apostrophe-templates': {
    viewsFolderFallback: path.join(__dirname, 'views')
  },
  'apostrophe-express': {
    csrf: {
      exceptions: ['/insertFab', '/trasmetti', '/updateFab', '/accettaById', '/rifiutaById', '/getAllRejected', '/getAllDraft']
    }
  },
  'apostrophe-rich-text-widgets': {},
  'apostrophe-pages': {
    types: [{
        name: 'home',
        label: 'Home'
      },
      {
        name: 'template-textimg',
        label: 'Template pagina'
      }
    ],
    park: [{
        title: 'Search',
        slug: '/search',
        type: 'apostrophe-search',
        label: 'Search',
        parkedId: 'search',
        published: true
      }, {
        title: 'Appalti',
        slug: '/appalti',
        type: 'appalti-page',
        label: 'Appalto',
        parkedId: 'appalto',
        published: true
      },
      {
        title: 'Consultazioni',
        slug: '/consultazioni',
        type: 'consultazioni-page',
        label: 'Consultazione',
        parkedId: 'consultazione',
        published: true
      },
      {
        title: 'Fabbisogni',
        slug: '/fabbisogni',
        type: 'fabbisogni-page',
        label: 'fabbisogni',
        parkedId: 'Fabbisogni',
        published: true
      },
      {
        title: 'Esprimi il tuo fabbisogno',
        slug: '/esprimi-fabbisogno',
        type: 'esprimi-fabbisogno-pages',
        label: 'Esprimi il tuo fabbisogno',
        parkedId: 'esprimiFabbisogno',
        published: true,
        loginRequired: 'loginRequired'
      }
    ]
  },
  'apostrophe-search': {
    perPage: 9,
    types: [
      'fabbisogni',
      'consultazioni',
      'appalti'
    ]
  },
  'apostrophe-workflow': {
    alias: 'workflow',
  },
  'apostrophe-headless': {
    apiKeys: ['Almaviva_1']
  },
  'categoriaAmministrazione': {
    restApi: true
  },
  'categoriaIPA': {
    restApi: true
  },
  'codiceIPA': {
    restApi: true
  },
  'fasciaImporto': {
    restApi: true
  },
  'statoApertura': {
    restApi: true
  },
  'tipologiaProcedura': {
    restApi: true
  },
  'appalti': {
    restApi: true
  },
  'appalti-pages': {
    extend: 'apostrophe-pieces-pages',
    perPage: 9
  },
  'consultazioni': {
    restApi: true
  },
  'consultazioni-pages': {
    extend: 'apostrophe-pieces-pages',
    perPage: 9
  },
  'fabbisogni': {
    restApi: true
  },
  'fabbisogni-pages': {
    extend: 'apostrophe-pieces-pages',
    perPage: 9
  },
  'evidenzaChallenge-widgets': {},
  'esprimi-fabbisogno-pages': {},
  'apostrophe-second-chance-login': {},
  'apostrophe-signup': {
    hours: 48,
    group: {
      title: 'guest',
    },
    signupUrl: '/signup',
    signupConfirmUrl: '/signup-confirm',
    afterSignupUrl: '/',
    fields: ['firstName',
      'lastName',
      'username',
      'repeat-password',
      'cf',
      'privacy'
    ]
  },
  'apostrophe-email': {
    nodemailer: {
      host: process.env.MAIL_SVC,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USR,
        pass: process.env.MAIL_PWD
      }
    }
  },
  'apostrophe-login': {
    passwordReset: true,
    passwordResetHours: 48,
    email: {
      from: process.env.MAIL_ADD
    }
  }
}
module.exports = apos({
  shortName: 'OPEN_INNOVATION_APOS',
  root: module,
  modules: _.assign(modules, modulesProd)
})