const r = require('request')
const nodemailer = require('nodemailer');
const _ = require('lodash');

//-------------//
// CONF REGION //
//-------------//

var transporterPEC = nodemailer.createTransport({
    host: process.env.HOST_PEC,
    port: process.env.PORT_PEC,
    secure: true,
    auth: {
        user: process.env.USER_PEC,
        pass: process.env.PASSWORD_PEC
    }
});

var transporterPEO = nodemailer.createTransport({
    host: process.env.HOST_PEO,
    port: process.env.PORT_PEO,
    secure: false,
    auth: {
        user: process.env.USER_PEO,
        pass: process.env.PASSWORD_PEO
    }
});

transporterPEC.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server PEC");
    }
})

transporterPEO.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server PEO");
    }
})


//----------------//
// PUBLIC METHODS //
//----------------//

function sendSottomissionePEO(request) {
    return new Promise((resolve, reject) => {
        try {
            var idBozza = request.body.idBozza
            console.log("sendSottomissionePEO idBozza -> " + idBozza);

            var optionObj = {}
            optionObj.mailType = 'PEO'

            getEmailTxt(getTextStringUri('USR_ACC'))
                .then(function (txtObj) {
                    optionObj.mailText = JSON.parse(txtObj).txtText
                    optionObj.mailHtml = JSON.parse(txtObj).txtHtml
                    return getBozzaById(idBozza)
                })
                .then(function (bozza) {
                    console.log(bozza.emailUser)
                    if (bozza.emailUser) {
                        console.log("sendSottomissionePEO emailUser -> " + bozza.emailUser);

                        var tgArr = []
                        tgArr.push(bozza.emailUser)
                        optionObj.targetAddr = tgArr
                    }
                    optionObj.titolo = bozza.titolo
                    optionObj.pdfDataObj = createPdfObjByBozza(bozza)
                    return createEmailOptionObj(optionObj)
                })
                .then(function (opt) {
                    return sendMailPEO(opt)
                })
                .then(function (result) {
                    resolve(result)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendSottomissionePEO = sendSottomissionePEO

function sendAccettaAgidPEO(request) {
    return new Promise((resolve, reject) => {
        try {
            var idBozza = request.body.idBozza

            var optionObj = {}
            optionObj.mailType = 'PEO'

            getEmailTxt(getTextStringUri('AGID_APPR_PEO'))
                .then(function (txtObj) {
                    optionObj.mailText = JSON.parse(txtObj).txtText
                    optionObj.mailHtml = JSON.parse(txtObj).txtHtml
                    return getBozzaById(idBozza)
                })
                .then(function (bozza) {
                    if (bozza.emailUser) {
                        var tgArr = []
                        tgArr.push(bozza.emailUser)
                        optionObj.targetAddr = tgArr
                    }
                    optionObj.titolo = bozza.titolo
                    if (bozza.motivazione) {
                        optionObj.mailText = optionObj.mailText + ' Motivazione: ' + bozza.motivazione
                        optionObj.mailHtml = optionObj.mailHtml + ' </br>Motivazione: </br>' + bozza.motivazione
                    }
                    optionObj.pdfDataObj = createPdfObjByBozza(bozza)
                    return createEmailOptionObj(optionObj)
                })
                .then(function (opt) {
                    return sendMailPEO(opt)
                })
                .then(function (result) {
                    resolve(result)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendAccettaAgidPEO = sendAccettaAgidPEO

function sendAccettaAgidPEC(request) {
    return new Promise((resolve, reject) => {
        try {
            var idBozza = request.body.idBozza

            var optionObj = {}
            optionObj.mailType = 'PEC'

            getEmailTxt(getTextStringUri('AGID_APPR_PEC'))
                .then(function (txtObj) {
                    optionObj.mailText = JSON.parse(txtObj).txtText
                    optionObj.mailHtml = JSON.parse(txtObj).txtHtml
                    return getBozzaById(idBozza)
                })
                .then(function (bozza) {
                    console.log(bozza.PEC)
                    if (bozza.PEC) {
                        var tgArr = []
                        tgArr.push(bozza.PEC)
                        optionObj.targetAddr = tgArr
                    }
                    optionObj.titolo = bozza.titolo
                    if (bozza.motivazione) {
                        optionObj.mailText = optionObj.mailText + ' Motivazione: ' + bozza.motivazione
                        optionObj.mailHtml = optionObj.mailHtml + ' </br>Motivazione: </br>' + bozza.motivazione
                    }
                    if (bozza.otp && bozza.idOtp) {
                        var indirizzo = process.env.FQDN_APOS + 'esprimi-fabbisogno/otp/' + bozza.idOtp
                        optionObj.mailText = 'Indirizzo Proposta: ' + indirizzo + ' OTP: ' + bozza.otp + ' ' + optionObj.mailText
                        optionObj.mailHtml = 'Indirizzo Proposta: ' + indirizzo + '</br> OTP: ' + bozza.otp + '</br>' + optionObj.mailHtml
                    }
                    optionObj.pdfDataObj = createPecPdfObjByBozza(bozza)
                    return createEmailOptionObj(optionObj)
                })
                .then(function (opt) {
                    return sendMailPEC(opt)
                })
                .then(function (result) {
                    resolve(result)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendAccettaAgidPEC = sendAccettaAgidPEC

function sendRifiutaAgid(request) {
    return new Promise((resolve, reject) => {
        try {
            var idBozza = request.body.idBozza

            var optionObj = {}
            optionObj.mailType = 'PEO'

            getEmailTxt(getTextStringUri('AGID_RIF'))
                .then(function (txtObj) {
                    optionObj.mailText = JSON.parse(txtObj).txtText
                    optionObj.mailHtml = JSON.parse(txtObj).txtHtml
                    return getBozzaById(idBozza)
                })
                .then(function (bozza) {
                    if (bozza.emailUser) {
                        var tgArr = []
                        tgArr.push(bozza.emailUser)
                        optionObj.targetAddr = tgArr
                    }
                    optionObj.titolo = bozza.titolo
                    if (bozza.motivazione) {
                        optionObj.mailText = optionObj.mailText + ' Motivazione: ' + bozza.motivazione
                        optionObj.mailHtml = optionObj.mailHtml + ' </br>Motivazione: </br>' + bozza.motivazione
                    }
                    optionObj.pdfDataObj = createPdfObjByBozza(bozza)
                    return createEmailOptionObj(optionObj)
                })
                .then(function (opt) {
                    return sendMailPEO(opt)
                })
                .then(function (result) {
                    resolve(result)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendRifiutaAgid = sendRifiutaAgid

function sendAccettaPA(request) {
    return new Promise((resolve, reject) => {
        try {
            var idBozza = request.body.idBozza

            var optionObj = {}
            optionObj.mailType = 'PEO'

            getEmailTxt(getTextStringUri('PA_PROM'))
                .then(function (txtObj) {
                    optionObj.mailText = JSON.parse(txtObj).txtText
                    optionObj.mailHtml = JSON.parse(txtObj).txtHtml
                    return getBozzaById(idBozza)
                })
                .then(function (bozza) {
                    if (bozza.emailUser) {
                        var tgArr = []
                        tgArr.push(bozza.emailUser)
                        optionObj.targetAddr = tgArr
                    }
                    optionObj.titolo = bozza.titolo
                    optionObj.pdfDataObj = createPdfObjByBozza(bozza)
                    return createEmailOptionObj(optionObj)
                })
                .then(function (opt) {
                    return sendMailPEO(opt)
                })
                .then(function (result) {
                    resolve(result)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendAccettaPA = sendAccettaPA

function sendRifiutaPA(request) {
    return new Promise((resolve, reject) => {
        try {
            var idBozza = request.body.idBozza

            var optionObj = {}
            optionObj.mailType = 'PEO'

            getEmailTxt(getTextStringUri('PA_BOCC'))
                .then(function (txtObj) {
                    optionObj.mailText = JSON.parse(txtObj).txtText
                    optionObj.mailHtml = JSON.parse(txtObj).txtHtml
                    return getBozzaById(idBozza)
                })
                .then(function (bozza) {
                    if (bozza.emailUser) {
                        var tgArr = []
                        tgArr.push(bozza.emailUser)
                        optionObj.targetAddr = tgArr
                    }
                    optionObj.titolo = bozza.titolo
                    optionObj.pdfDataObj = createPdfObjByBozza(bozza)
                    return createEmailOptionObj(optionObj)
                })
                .then(function (opt) {
                    return sendMailPEO(opt)
                })
                .then(function (result) {
                    resolve(result)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendRifiutaPA = sendRifiutaPA

//----------------//
// UTILITY REGION //
//----------------//

function composepdf(data) {
    return new Promise((resolve, reject) => {
        r.post(process.env.SERVICE_PDF + '/createPdfFromJson', {
            json: data
        }, function (err, response, body) {
            if (err) reject(err);
            else {
                resolve(body)
            }
        })
    })
}

function getBozzaById(idBozza) {
    return new Promise((resolve, reject) => {
        url = process.env.SERVICE_BOZZE + 'api/bozzaFabbisognos/' + idBozza

        console.log("getBozzaById idBozza -> " + idBozza)
        console.log("getBozzaById url -> " + url)

        r(url, function (err, response, body) {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                console.log(JSON.parse(body))
                resolve(JSON.parse(body));
            }
        })
    })
}

function getEmailTxt(textSelector) {
    return new Promise((resolve, reject) => {
        url = process.env.SERVICE_APOS + textSelector

        r(url, function (err, response, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body)
            }
        })
    })
}

function createPdfObjByBozza(bozza) {
    var obj = {};
    const problematica = require('./problematica.js');
    var arrProblematica = []

    _.each(bozza.problematica, function (v, i) {
        arrProblematica.push(problematica[v]);
    });

    obj.emailUser = bozza.emailUser;
    obj.propertyArray = `[{
      "label": "Titolo",
      "value": "${bozza.titolo || ''}"
    }, {
      "label": "Tipo di fabbisogno",
      "value": "${arrProblematica[0] || ''}"
    }, {
      "label": "Tipo di fabbisogno",
      "value": "${arrProblematica[1] || ''}"
    }, {
      "label": "Tipo di fabbisogno",
      "value": "${arrProblematica[2] || ''}"
    }, {
       "label": "Tipo di fabbisogno",
       "value": "${arrProblematica[3] || ''}"
    }, {
      "label": "Contesto",
      "value": "${bozza.informazioni || ''}"
    }, {
      "label": "Scenario applicativo 1",
      "value": "${bozza.scenarioApplicativo[0] || ''}"
    }, {
      "label": "Scenario applicativo 2",
      "value": "${bozza.scenarioApplicativo[1] || ''}"
    }, {
      "label": "Scenario applicativo 3",
      "value": "${bozza.scenarioApplicativo[2] || ''}"
    }, {
      "label": "Sarebbe bello se",
      "value": "${bozza.sbs || ''}"
    }, {
      "label": "Costruzione dei casi d'uso",
      "value": "Come ${bozza.cscu.cdcuSogg || ''} dovrei poter ${bozza.cscu.cdcuAzione || ''} cosicché io/lui possa 
      ${bozza.cscu.cdcuValore || ''}."
    }, {
      "label": "Benefici per la società",
      "value": "${bozza.beneficiSociali || ''}"
    }, {
      "label": "Benefici economici",
      "value": "${bozza.beneficiEconomici || ''}"
    }, {
      "label": "Domanda aggregata",
      "value": "${bozza.domandaAggregata || ''}"
    }, {
      "label": "Campo libero",
      "value": "${bozza.campoLibero || ''}"
    }, {
      "label": "PEC",
      "value": "${bozza.PEC || ''}"
    }]`.replace(/\s\s+/g, '');

    // return JSON.parse(obj)
    return obj
}

function createPecPdfObjByBozza(bozza) {
    var obj = {};
    const problematica = require('./problematica.js');
    var arrProblematica = []

    _.each(bozza.problematica, function (v, i) {
        arrProblematica.push(problematica[v]);
    });

    obj.emailUser = bozza.emailUser;
    obj.propertyArray = `[{
      "label": "Titolo",
      "value": "${bozza.titolo || ''}"
    }, {
        "label": "OTP",
        "value": "${bozza.otp || ''}"
    }, {
        "label": "URL",
        "value": "${process.env.FQDN_APOS}esprimi-fabbisogno/otp/${bozza.idOtp || ''}"
    }, {
      "label": "Tipo di fabbisogno",
      "value": "${arrProblematica[0] || ''}"
    }, {
      "label": "Tipo di fabbisogno",
      "value": "${arrProblematica[1] || ''}"
    }, {
      "label": "Tipo di fabbisogno",
      "value": "${arrProblematica[2] || ''}"
    }, {
       "label": "Tipo di fabbisogno",
       "value": "${arrProblematica[3] || ''}"
    }, {
      "label": "Contesto",
      "value": "${bozza.informazioni || ''}"
    }, {
      "label": "Scenario applicativo 1",
      "value": "${bozza.scenarioApplicativo[0] || ''}"
    }, {
      "label": "Scenario applicativo 2",
      "value": "${bozza.scenarioApplicativo[1] || ''}"
    }, {
      "label": "Scenario applicativo 3",
      "value": "${bozza.scenarioApplicativo[2] || ''}"
    }, {
      "label": "Sarebbe bello se",
      "value": "${bozza.sbs || ''}"
    }, {
      "label": "Costruzione dei casi d'uso",
      "value": "Come ${bozza.cscu.cdcuSogg || ''} dovrei poter ${bozza.cscu.cdcuAzione || ''} cosicché io/lui possa 
      ${bozza.cscu.cdcuValore || ''}."
    }, {
      "label": "Benefici per la società",
      "value": "${bozza.beneficiSociali || ''}"
    }, {
      "label": "Benefici economici",
      "value": "${bozza.beneficiEconomici || ''}"
    }, {
      "label": "Domanda aggregata",
      "value": "${bozza.domandaAggregata || ''}"
    }, {
      "label": "Campo libero",
      "value": "${bozza.campoLibero || ''}"
    }, {
      "label": "PEC",
      "value": "${bozza.PEC || ''}"
    }]`.replace(/\s\s+/g, '');

    // return JSON.parse(obj)
    return obj
}

function createEmailOptionObj(optionObj) {
    return new Promise((resolve, reject) => {
        try {

            var mailFrom = ''
            var mailTo = []
            if (optionObj.mailType && optionObj.mailType == 'PEO') {
                mailFrom = process.env.EMAILPEO
                mailTo = mailTo.concat(JSON.parse(process.env.DEST_PEO))
            } else if (optionObj.mailType && optionObj.mailType == 'PEC') {
                mailFrom = process.env.EMAILPEC
                mailTo = mailTo.concat(JSON.parse(process.env.DEST_PEC))
            }

            mailTo = mailTo.concat(optionObj.targetAddr)

            composepdf(optionObj.pdfDataObj)
                .then(function (data) {
                    let mailOptions = {
                        from: mailFrom,
                        to: mailTo,
                        subject: `[AGID - AppaltInnovativi Sottomissione Fabbisogno] - ${optionObj.titolo}`,
                        text: optionObj.mailText,
                        html: optionObj.mailHtml,
                        attachments: [{
                            path: data,
                            filename: `${optionObj.titolo}.pdf`
                        }]
                    };

                    return mailOptions
                })
                .then(function (opt) {
                    resolve(opt)
                })
        } catch (error) {
            reject(error)
        }
    })
}

function sendMailPEC(mailOpt) {
    return new Promise((resolve, reject) => {
        transporterPEC.sendMail(mailOpt, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    })
}

function sendMailPEO(mailOpt) {
    return new Promise((resolve, reject) => {
        transporterPEO.sendMail(mailOpt, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    })
}

function getTextStringUri(selector) {

    var resVal = ''

    switch (selector) {
        case 'USR_ACC':
            resVal = 'modules/esprimi-fabbisogno-pages/textEmailAccettazione'
            break;
        case 'AGID_APPR_PEO':
            resVal = 'modules/esprimi-fabbisogno-pages/textEmailApprovazioneAGID'
            break;
        case 'AGID_APPR_PEC':
            resVal = 'modules/esprimi-fabbisogno-pages/textEmailPecPa'
            break;
        case 'AGID_RIF':
            resVal = 'modules/esprimi-fabbisogno-pages/textEmailRifiutoAGID'
            break;
        case 'PA_PROM':
            resVal = 'modules/esprimi-fabbisogno-pages/textEmailAccettazionePA'
            break;
        case 'PA_BOCC':
            resVal = 'modules/esprimi-fabbisogno-pages/textEmailRifiutoPA'
            break;
        default:
            break;
    }

    return resVal
}