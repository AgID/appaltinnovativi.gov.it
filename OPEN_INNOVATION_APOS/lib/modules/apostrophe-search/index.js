var _ = require('@sailshq/lodash');
var async = require('async');
module.exports = {
    construct: function (self, options) {
        self.indexPage = function (req, callback) {
            req.query.search = req.query.search || req.query.q;
            var allowedTypes = req.query.f ? req.query.f.split(' ') : false;
            var defaultingToAll = false;
            var categorie = req.query.c;
            var stati = req.query.s;
            var tipoProcedura = req.query.t;
            var query = {
                $and: []
            };
            categorie ? composeQuery(categorie, 'categoriaAmministrazioneProponenteId') : false;
           // stati ? composeQuery(stati, 'statoAperturaId') : false;
            tipoProcedura ? composeQuery(tipoProcedura, 'tipologiaProceduraId') : false;
            //sovrascrivo il cursore di apostrophe per applicare la query custom
            var cursor = self.apos.docs.find(req, {}).sort({
                    title: 1
                }).limit(12)
                .queryToFilters(req.query, 'public')
                .perPage(self.perPage);
            if (!allowedTypes) {
                allowedTypes = self.types;
            }
            cursor.and({
                type: {
                    $in: allowedTypes
                }
            });
            if (query.$and.length > 0) {
                cursor.and(query);
            }
            var docs = [];
            if (self.filters) {
                req.data.filters = _.cloneDeep(self.filters);
                _.each(req.data.filters, function (filter) {
                    if (defaultingToAll || req.query[filter.name]) {
                        filter.value = true;
                    }
                });
            }
            return async.series([totalDocs, findDocs], function (err) {
                if (err) {
                    return callback(err);
                }
                if (self.apos.utils.isAjaxRequest(req)) {
                    req.template = self.renderer('indexAjax');
                } else {
                    req.template = self.renderer('index');
                }
                req.data.currentPage = cursor.get('page');
                req.data.docs = docs;
                return self.beforeIndex(req, callback);
            });

            function totalDocs(callback) {
                return cursor.toCount(function (err, count) {
                    if (err) {
                        return callback(err);
                    }
                    if (cursor.get('page') > cursor.get('totalPages')) {
                        req.notFound = true;
                        return callback(null);
                    }
                    req.data.totalDocs = count;
                    req.data.totalPages = cursor.get('totalPages');
                    return callback();
                });
            }

            function findDocs(callback) {
                // Polymorphic find: fetch just the ids at first, then go back
                // and fetch them via their own type managers so that we get the
                // expected joins and urls and suchlike.
                var idsAndTypes;
                var byType;
                return async.series([
                    getIdsAndTypes,
                    getDocs
                ], callback);

                function getIdsAndTypes(callback) {
                    return cursor.projection({
                        _id: 1,
                        type: 1
                    }).toArray(function (err, _idsAndTypes) {
                        if (err) {
                            return callback(err);
                        }
                        idsAndTypes = _idsAndTypes;
                        return callback(null);
                    });
                }

                function getDocs(callback) {
                    byType = _.groupBy(idsAndTypes, 'type');
                    return async.eachSeries(_.keys(byType), getDocsOfType, function (err) {
                        if (err) {
                            return callback(err);
                        }
                        // Restore the intended order ($in doesn't respect it and neither does
                        // fetching them all by type). ACHTUNG: without this search quality goes
                        // right out the window. -Tom
                        docs = self.apos.utils.orderById(_.pluck(idsAndTypes, '_id'), docs);
                        return callback(null);
                    });
                }

                function getDocsOfType(type, callback) {
                    var manager = self.apos.docs.getManager(type);
                    if (!manager) {
                        return setImmediate(callback);
                    }
                    return manager.find(req, {
                        type: type,
                        _id: {
                            $in: _.pluck(byType[type], '_id')
                        }
                    }).toArray(function (err, docsOfType) {
                        if (err) {
                            return callback(err);
                        }
                        docs = docs.concat(docsOfType);
                        return callback(null);
                    });
                }
            }

            function composeQuery(arg, from) {
                var arr = arg.split(' ');
                var _q = {
                    $or: []
                };
                _.each(arr, function (v, i) {
                    var filterObj = {}
                    filterObj[from] = v
                    _q.$or.push(filterObj);
                })
                query.$and.push(_q)
                return true;
            }
        };
    }
}