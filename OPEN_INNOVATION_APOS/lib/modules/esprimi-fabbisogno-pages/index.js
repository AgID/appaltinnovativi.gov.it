var _ = require('@sailshq/lodash');
var async = require('async');
var r = require('request');
const cuid = require('cuid');
const otp = require('otp')
module.exports = {
    extend: 'apostrophe-custom-pages',
    name: 'esprimi-fabbisogno-pages',
    afterConstruct: function (self) {

        self.dispatchRoute();
        self.dispatchAll();
    },
    construct: function (self, options) {

        self.insertPage = function (req, callback) {
            self.route('post', 'insertFab', function (req, res) {
                var objToSend = req.body;
                objToSend.idUser = req.user._id;
                objToSend.emailUser = req.user.email || '';
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos'
                r.post(url, {
                    json: objToSend
                }, function (err, response, body) {
                    if (err) res.send(err);
                    else {
                        res.send("/esprimi-fabbisogno/");
                    }
                })
            })
            req.template = self.renderer('insert');
            return self.beforeIndex(req, callback);
        };

        self.editInsertPage = function (req, callback) {
            self.route('post', 'updateFab', function (req, res) {
                var objToSend = req.body;
                objToSend.idUser = req.user._id;
                objToSend.emailUser = req.user.email || '';
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/' + objToSend.id
                delete objToSend['id']
                r.put(url, {
                    json: objToSend
                }, function (err, response, body) {
                    if (err) res.send(err);
                    res.send("/esprimi-fabbisogno/");
                })
            })
            var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/' + req.params.idFab;
            r(url, function (err, response, body) {
                if (err) body = {};
                body = body != {} ? JSON.parse(body) : {};
                req.data.doc = body;
                req.template = self.renderer('editInsert');
                return self.beforeIndex(req, callback);
            })

        };

        self.previewPage = function (request, callback) {
            self.route('post', 'rifiutaFab', function (req, res) {
                var obj = req.body;
                var bozza = {}
                async.series({
                    accepted: function (callback) {
                        var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/rifiutaById';
                        r.post(url, {
                            json: {
                                obj: obj
                            }
                        }, function (err, response, body) {
                            if (err) res.send(err);
                            else {
                                bozza.idBozza = body.result.idBozza
                                callback(null)
                            }
                        })
                    },
                    submit: function (callback) {
                        let url = process.env.MAIL_URI + 'sendRifiutaAgid'
                        r.post(url, {
                                json: {
                                    idBozza: bozza.idBozza
                                }
                            },
                            function (err, response, body) {
                                callback(null)
                            }
                        )
                    },
                    function (_res) {
                        res.send("/esprimi-fabbisogno/");
                    }
                })
            })
            self.route('post', 'accettaFab', function (req, res) {
                var obj = req.body;
                obj.idOtp = cuid();
                var otpToSend = otp({
                    codeLength: 8
                });
                obj.otp = otpToSend.totp();
                var bozza = {}
                async.series({
                    accepted: function (callback) {
                        var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/accettaById';
                        r.post(url, {
                            json: {
                                obj: obj
                            }
                        }, function (err, response, body) {
                            if (err) res.send(err);
                            else {
                                bozza.idBozza = body.result.idBozza
                                callback(null)
                            }
                        })
                    },
                    submit: function (callback) {
                        let url = process.env.MAIL_URI + 'sendAccettaAgid'
                        r.post(url, {
                                json: {
                                    idBozza: bozza.idBozza
                                }
                            },
                            function (err, response, body) {
                                callback(null)
                            }
                        )
                    },
                    function (_res) {
                        res.send("/esprimi-fabbisogno/");
                    }
                })
            })
            var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/' + request.params.idFab;
            r(url, function (err, response, body) {
                if (err) body = {};
                body = body ? JSON.parse(body) : {};
                request.data.doc = body
                request.template = self.renderer('preview');
                return self.beforeIndex(request, callback);
            })

        };

        self.dashboardPage = function (req, callback) {
            if (req.user && req.user._permissions.admin) {
                self.isAdmin(req, callback)
            } else {
                self.isUser(req, callback)
            }
        };

        self.isAdmin = function (req, callback) {
            self.route('post', 'getAllRejected', function (req, res) {
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/getAllRejected'
                r.get(url, function (err, response, body) {
                    var resObj = {}
                    resObj.data = JSON.parse(body).result;
                    resObj.status = "Rifiutati"
                    return res.send(self.render(req, 'table', {
                        options: {},
                        docs: resObj
                    }));
                })
            })
            self.route('post', 'connectFabApos', function (req, res) {
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/updateUrlFab'
                r.post(url, {
                    json: {
                        obj: req.body
                    }
                }, function (err, response, body) {
                    if (err) res.send(err)
                    res.send(body.result.response)
                })
            })
            self.route('post', 'getAllProcessed', function (req, res) {
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/getAllProcessed'
                r.get(url, function (err, response, body) {
                    var resObj = {}
                    resObj.data = JSON.parse(body).result;
                    resObj.status = "Processati"
                    return res.send(self.render(req, 'tableProcessed', {
                        options: {},
                        docs: resObj
                    }));
                })
            })
            self.route('post', 'getAllDraft', function (req, res) {
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/getAllDraft'
                r.get(url, function (err, response, body) {
                    var resObj = {}
                    resObj.data = JSON.parse(body).result;
                    resObj.status = "Bozze"
                    return res.send(self.render(req, 'table', {
                        options: {},
                        docs: resObj
                    }));
                })
            })
            self.route('post', 'getAllAccepted', function (req, res) {
                var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/getAllAccepted'
                r.get(url, function (err, response, body) {
                    var resObj = {}
                    resObj.data = JSON.parse(body).result;
                    resObj.status = "Approvati"
                    return res.send(self.render(req, 'table', {
                        options: {},
                        docs: resObj
                    }));
                })
            })
            self.route('post', 'getOneFabById', function (req, res) {
                var url = process.env.SERVICE_URI + `api/bozzaFabbisognos/${req.body.id}`
                r.get(url, function (err, response, body) {
                    if (err) body = {}
                    body = body != {} ? JSON.parse(body).result : {};
                    res.send(body)
                })
            })
            var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/getAllTrasmitted';
            r(url, function (err, response, body) {
                if (err) body = [];
                body = body.length ? JSON.parse(body).result : [];
                req.data.docs = body;
                req.template = self.renderer('dashboard');
                return self.beforeIndex(req, callback);
            })
        };

        self.isUser = function (req, callback) {
            self.route('post', 'elimina', function (req, res) {
                var objToSend = req.body;
                let url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/removeFabById'
                r.post(url, {
                    json: {
                        obj: objToSend
                    }
                }, function (err, response, body) {
                    if (err)
                        res.send(err)
                    res.send({
                        status: body.result.status
                    })
                })

            })
            self.route('post', 'trasmetti', function (req, res) {
                var pa = {};
                var objToSend = req.body;
                var idBozza;
                async.series({
                    cursor: function (callback) {
                        self.apos.docs.getManager('codiceIPA').find(req, {
                                pec: {
                                    $elemMatch: {
                                        email: req.body.PEC
                                    }
                                }
                            }, {}).workflowLocale('default-draft')
                            .permission(false)
                            .toArray(function (err, _pa) {
                                if (err) pa = undefined
                                else pa = _pa[0]
                                callback(null)
                            })
                    },
                    trasmitted: function (callback) {
                        let url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/trasmettiById'
                        objToSend.PECverify = pa != undefined ? true : false;
                        objToSend.paName = pa != undefined ? pa.name : ''
                        r.post(url, {
                            json: {
                                obj: objToSend
                            }
                        }, function (err, res, body) {
                            idBozza = body.result.idBozza
                            callback(null)
                        })
                    },
                    sumbit: function (callback) {
                        let url = process.env.MAIL_URI + 'sendSottomissionePEO'
                        r.post(url, {
                                json: {
                                    idBozza: idBozza
                                }
                            },
                            function (err, response, body) {
                                callback(null)
                            }
                        )
                    },
                    function (_res) {
                        res.send("/esprimi-fabbisogno/");
                    }
                })
            })
            var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/GetAllByIdUser';
            r.post(url, {
                json: {
                    "idUser": req.user._id
                }
            }, function (err, response, body) {
                if (err) body.result = [];
                body = body.result.length ? body.result : [];
                req.data.docs = body;
                req.template = self.renderer('dashboard');
                return self.beforeIndex(req, callback);
            })
        };

        self.otpPage = function (req, callback) {
            self.route('post', 'accettaFab', function (request, res) {
                var objToSend = {};
                objToSend.idUser = request.user._id;
                objToSend.otp = request.body.opt.replace(/\s/g, '')
                objToSend.status = 'accettato';
                objToSend.idOtp = req.params.otp
                var bozza = {}
                async.series({
                    process: function (callback) {
                        var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/processaById'
                        r.post(url, {
                            json: {
                                obj: objToSend
                            }
                        }, function (err, response, body) {
                            if (err) res.send(err);
                            bozza.idBozza = body.result.idBozza
                            callback()
                        })
                    },
                    trasmitted: function (callback) {
                        let url = process.env.MAIL_URI + 'sendAccettaPA'
                        r.post(url, {
                            json: {
                                idBozza: bozza.idBozza
                            }
                        }, function (err, res, body) {
                            callback(null)
                        })
                    },
                    function (_res) {
                        res.send({
                            url: "/esprimi-fabbisogno/",
                            status: "Processato accettato"
                        });
                    }
                })
            })
            self.route('post', 'rifiutaFab', function (request, res) {
                var objToSend = {};
                objToSend.idUser = request.user._id;
                objToSend.status = 'rifiutato';
                objToSend.otp = request.body.opt.replace(/\s/g, '')
                objToSend.idOtp = req.params.otp
                var bozza = {};
                async.series({
                    process: function (callback) {
                        var url = process.env.SERVICE_URI + 'api/bozzaFabbisognos/processaById'
                        r.post(url, {
                            json: {
                                obj: objToSend
                            }
                        }, function (err, response, body) {
                            if (err) res.send(err);
                            bozza.idBozza = body.result.idBozza
                            callback()
                        })
                    },
                    trasmitted: function (callback) {
                        let url = process.env.MAIL_URI + 'sendRifiutaPA'
                        r.post(url, {
                            json: {
                                idBozza: bozza.idBozza
                            }
                        }, function (err, res, body) {
                            callback(null)
                        })
                    },
                    function (_res) {
                        res.send({
                            url: "/esprimi-fabbisogno/",
                            status: "Processato rifiutato"
                        });
                    }
                })
            })

            req.template = self.renderer('otp');
            return self.beforeIndex(req, callback);
        }

        self.dispatchAll = function () {
            self.dispatch('/', self.dashboardPage);
            self.dispatch('/edit/:idFab', self.editInsertPage);
            self.dispatch('/preview/:idFab', self.previewPage);
            self.dispatch('/insert', self.insertPage);
            self.dispatch('/otp/:otp', self.otpPage);

        };

        self.dispatchRoute = function () {
            self.apos.app.get(`/modules/${self.name}/textEmailAccettazione`, function (req, res) {
                if (req.data.global.trasmissioneAccetta.html && req.data.global.trasmissioneAccetta.text)
                    res.send({
                        txtText: req.data.global.trasmissioneAccetta.text || '',
                        txtHtml: req.data.global.trasmissioneAccetta.html.items[0].content || ''
                    })
                else
                    res.send({
                        txtText: "",
                        txtHtml: ""
                    })
            })
            self.apos.app.get(`/modules/${self.name}/textEmailApprovazioneAGID`, function (req, res) {
                if (req.data.global.approvazioneAGID.html && req.data.global.approvazioneAGID.text)
                    res.send({
                        txtText: req.data.global.approvazioneAGID.text || '',
                        txtHtml: req.data.global.approvazioneAGID.html.items[0].content || ''
                    })
                else
                    res.send({
                        txtText: "",
                        txtHtml: ""
                    })
            })
            self.apos.app.get(`/modules/${self.name}/textEmailPecPa`, function (req, res) {
                if (req.data.global.pecPA.html && req.data.global.pecPA.text)
                    res.send({
                        txtText: req.data.global.pecPA.text || '',
                        txtHtml: req.data.global.pecPA.html.items[0].content || ''
                    })
                else
                    res.send({
                        txtText: "",
                        txtHtml: ""
                    })
            })
            self.apos.app.get(`/modules/${self.name}/textEmailRifiutoAGID`, function (req, res) {
                if (req.data.global.rifiutaAGID.html && req.data.global.rifiutaAGID.text)
                    res.send({
                        txtText: req.data.global.rifiutaAGID.text || '',
                        txtHtml: req.data.global.rifiutaAGID.html.items[0].content || ''
                    })
                else
                    res.send({
                        txtText: "",
                        txtHtml: ""
                    })
            })
            self.apos.app.get(`/modules/${self.name}/textEmailAccettazionePA`, function (req, res) {
                if (req.data.global.accettazionePA.html && req.data.global.accettazionePA.text)
                    res.send({
                        txtText: req.data.global.accettazionePA.text || '',
                        txtHtml: req.data.global.accettazionePA.html.items[0].content || ''
                    })
                else
                    res.send({
                        txtText: "",
                        txtHtml: ""
                    })
            })
            self.apos.app.get(`/modules/${self.name}/textEmailRifiutoPA`, function (req, res) {
                if (req.data.global.rifiutoPA.html && req.data.global.rifiutoPA.text)
                    res.send({
                        txtText: req.data.global.rifiutoPA.text || '',
                        txtHtml: req.data.global.rifiutoPA.html.items[0].content || ''
                    })
                else
                    res.send({
                        txtText: "",
                        txtHtml: ""
                    })
            })
        }

        self.beforeIndex = function (req, callback) {
            return setImmediate(callback);
        };
    }
}