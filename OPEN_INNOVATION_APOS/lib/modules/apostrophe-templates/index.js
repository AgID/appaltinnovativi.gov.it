var _ = require('@sailshq/lodash');
var moment = require('moment');
var qs = require('qs');

module.exports = {

    construct: function (self, options) {

        self.apos.templates.addFilter('getStatus', function (doc) {
            if (doc.isDraft) {
                return "Bozza";
            }
            if (doc.isTransmitted) {
                return "Trasmesso";
            }
            if (doc.isApprovated) {
                return "Approvato";
            }
            if (doc.isAccepted) {
                return "Accettato (Agid)";
            }
            if (doc.isRejected) {
                return "Rifiutato (Agid)";
            }
            if (doc.isProcessed) {
                if (doc.status === "rifiutato")
                    return "Non Validato dalla PA"
                else
                    return "Validato dalla PA"
            }
        });
        self.apos.templates.addFilter('repeatPassword', function (data) {
            data.help = 'Ripeti password'
            return data
        });

    }
};