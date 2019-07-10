'use strict';
const r = require('request');
const _ = require('lodash');
module.exports = function (BozzaFabbisogno) {

  BozzaFabbisogno.GetAllByIdUser = function (idUser, cb) {
    if (idUser) {
      var queyFilter = {};
      var where = queyFilter.where = {};
      where.idUser = idUser;

      BozzaFabbisogno.find(queyFilter, function (err, bozze) {
        if (err) cb(err, null);
        else cb(null, bozze);
      })
    } else {
      cb(null, []);
    }
  }

  BozzaFabbisogno.remoteMethod('GetAllByIdUser', {
    accepts: {
      arg: 'idUser',
      type: 'string'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

  BozzaFabbisogno.getAllTrasmitted = function (cb) {
    var queyFilter = {};
    var where = queyFilter.where = {};
    where.isTransmitted = true;

    BozzaFabbisogno.find(queyFilter, function (err, bozze) {
      if (err) cb(err, null);
      else cb(null, bozze);
    })
  }

  BozzaFabbisogno.remoteMethod('getAllTrasmitted', {
    http: {
      path: '/getAllTrasmitted',
      verb: 'get'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

  BozzaFabbisogno.trasmettiById = function (obj, cb) {
    if (obj) {
      // var recivedData = JSON.parse(dataToPost);
      var filter = {};
      var data = {};
      data.isDraft = false;
      data.isTransmitted = true;
      data.PEC = obj.PEC;
      data.PECverify = obj.PECverify
      data.paName = obj.paName
      var idBozza = obj.id;
      BozzaFabbisogno.findById(idBozza, filter, function (err, fabbisogno) {
        if (err) cb(err, null);
        else {
          fabbisogno.updateAttributes(data, function (err, bozza) {
            if (err) cb(err, null);
            else cb(null, {
              idBozza: bozza.id.toString()
            });
          })
        }
      })
    }
  }

  BozzaFabbisogno.remoteMethod('trasmettiById', {
    accepts: {
      arg: 'obj',
      type: 'object'
    },
    returns: {
      arg: 'result',
      type: 'boolean'
    }
  })

  BozzaFabbisogno.accettaById = function (obj, cb) {
    if (obj) {
      var filter = {}
      var data = {}
      data.isDraft = false;
      data.isTransmitted = false;
      data.isRejected = false;
      data.isAccepted = true;
      data.otp = obj.otp
      data.idOtp = obj.idOtp
      if (obj.PEC)
        data.PEC = obj.PEC
      data.motivazione = obj.motivazione;
      var idBozza = obj.id;
      BozzaFabbisogno.findById(idBozza, filter, function (err, fabbisogno) {
        if (err) cb(err, null);
        else {
          fabbisogno.updateAttributes(data, function (err, bozza) {
            if (err) cb(err, null);
            else {
              //sendMail(fabbisogno).then(function (res) {
              //if (res == true)
              cb(null, {
                idBozza: bozza.id.toString()
              })
              //else cd('errore')
              //})
            }
          })
        }
      })
    }
  }

  BozzaFabbisogno.remoteMethod('accettaById', {
    accepts: {
      arg: 'obj',
      type: 'object'
    },
    returns: {
      arg: 'result',
      type: 'boolean'
    }
  })

  BozzaFabbisogno.rifiutaById = function (obj, cb) {
    if (obj) {
      var filter = {};
      var data = {};
      data.isDraft = false;
      data.isTransmitted = false;
      data.isAccepted = false;
      data.isRejected = true;
      if (obj.PEC)
        data.PEC = obj.PEC
      data.motivazione = obj.motivazione
      BozzaFabbisogno.findById(obj.id, filter, function (err, fabbisogno) {
        if (err) cb(err, null)
        else {
          fabbisogno.updateAttributes(data, function (err, bozza) {
            if (err) cb(err, null);
            else cb(null, {
              idBozza: bozza.id.toString()
            })
          })
        }
      })
    }
  }

  BozzaFabbisogno.remoteMethod('rifiutaById', {
    accepts: {
      arg: 'obj',
      type: 'object'
    },
    returns: {
      arg: 'result',
      type: 'boolean'
    }
  })

  BozzaFabbisogno.getAllRejected = function (cb) {
    var queyFilter = {};
    var where = queyFilter.where = {};
    where.isRejected = true;

    BozzaFabbisogno.find(queyFilter, function (err, bozze) {
      if (err) cb(err, null);
      else cb(null, bozze);
    })
  }

  BozzaFabbisogno.remoteMethod('getAllRejected', {
    http: {
      path: '/getAllRejected',
      verb: 'get'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })
  BozzaFabbisogno.getAllProcessed = function (cb) {
    var queyFilter = {};
    var where = queyFilter.where = {};
    where.and = []
    where.and.push({
      isProcessed: 'true',
      status: 'accettato'
    })
    BozzaFabbisogno.find(queyFilter, function (err, bozze) {
      if (err) cb(err, null);
      else cb(null, bozze);
    })
  }

  BozzaFabbisogno.remoteMethod('getAllProcessed', {
    http: {
      path: '/getAllProcessed',
      verb: 'get'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

  BozzaFabbisogno.getAllDraft = function (cb) {
    var queyFilter = {};
    var where = queyFilter.where = {};
    where.isDraft = true;
    BozzaFabbisogno.find(queyFilter, function (err, bozze) {
      if (err) cb(err, null);
      else cb(null, bozze);
    })
  }

  BozzaFabbisogno.remoteMethod('getAllDraft', {
    http: {
      path: '/getAllDraft',
      verb: 'get'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

  BozzaFabbisogno.getAllAccepted = function (cb) {
    var queyFilter = {};
    var where = queyFilter.where = {};
    where.isAccepted = true;
    BozzaFabbisogno.find(queyFilter, function (err, bozze) {
      if (err) cb(err, null);
      else cb(null, bozze);
    })
  }

  BozzaFabbisogno.remoteMethod('getAllAccepted', {
    http: {
      path: '/getAllAccepted',
      verb: 'get'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })


  BozzaFabbisogno.updateUrlFab = function (obj, cb) {
    var queyFilter = {};
    var where = queyFilter.where = {};
    where.id = obj.id;
    BozzaFabbisogno.findOne(queyFilter, function (err, bozza) {
      if (err) cb(err, null);
      else {
        if (bozza) {
          var data = {}
          data.urlApos = obj.urlApos
          bozza.updateAttributes(data, function (err, bozza) {
            if (err) cb(err, null);
            else cb(null, {
              response: true
            });
          })
        } else {
          cb(null, {
            idBozza: 'Fabbisogno non trovato'
          });
        }
      }
    })
  }

  BozzaFabbisogno.remoteMethod('updateUrlFab', {
    accepts: {
      arg: 'obj',
      type: 'object'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

  BozzaFabbisogno.insert = function (data, cb) {
    BozzaFabbisogno.create(data, function (err, fab) {
      if (err) cb(err, null);
      else {
        // let url = process.env.SERVICE_EMAIL + '/sendPEO';
        // r.post(url, {
        //   json: fab.emailUser
        // }, function (err, res, body) {
        //   if (err) cb(err, null);
        //   else cb(null, 'success')
        // })
      }
    })
  }

  BozzaFabbisogno.remoteMethod('insert', {
    accepts: {
      arg: 'data',
      type: 'string'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

  BozzaFabbisogno.processaById = function (obj, cb) {
    if (obj) {
      var queyFilter = {};
      var where = queyFilter.where = {};
      where.and = []
      where.and.push({
        otp: obj.otp,
        idOtp: obj.idOtp
      });
      BozzaFabbisogno.findOne(queyFilter, function (err, bozza) {
        if (err) cb(err, null);
        else {
          if (bozza) {
            var data = {}
            data.status = obj.status
            data.isProcessed = true
            data.isDraft = false;
            data.isTransmitted = false;
            data.isAccepted = false;
            data.isRejected = false;
            bozza.updateAttributes(data, function (err, bozza) {
              if (err) cb(err, null);
              else cb(null, {
                response: true,
                status: obj.status,
                idBozza: bozza.id.toString()
              });
            })
          } else {
            cb(null, {
              idBozza: 'Fabbisogno non trovato'
            });
          }
        }
      })
    }
  }

  BozzaFabbisogno.remoteMethod('processaById', {
    accepts: {
      arg: 'obj',
      type: 'object'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })


  BozzaFabbisogno.removeFabById = function (obj, cb) {
    if (obj) {
      var queyFilter = {};
      var where = queyFilter.where = {};
      where.id = obj.id
      BozzaFabbisogno.deleteById(obj.id, {}, function (err, res) {
        if (err) cb(err, null);
        else {
          if (res.count > 0) {
            cb(null, {
              status: 'Bozza eliminata'
            });
          } else {
            cb(null, {
              status: 'Errore'
            });
          }
        }
      })
    }
  }

  BozzaFabbisogno.remoteMethod('removeFabById', {
    accepts: {
      arg: 'obj',
      type: 'object'
    },
    returns: {
      arg: 'result',
      type: 'string'
    }
  })

}
