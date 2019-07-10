// `apostrophe-pieces-pages` implements "index pages" that display pieces of a
// particular type in a paginated, filterable way. It's great for implementing
// blogs, event listings, project listings, staff directories... almost any
// content type.
//
// You will `extend` this module in new modules corresponding to your modules
// that extend `apostrophe-pieces`.
//
// To learn more and see complete examples, see:
//
// [Reusable content with pieces](../../tutorials/getting-started/reusable-content-with-pieces.html)
//
// ## Options
//
// ### `piecesFilters`
//
// If present, this is an array of objects with `name` properties. The named cursor filters are
// marked as `safeFor: "public"` if they exist, and an array of choices for each is populated
// in `req.data.piecesFilters.tags` (if the field in question is `tags`), etc. The choices in the
// array are objects with `label` and `value` properties.
//
// If a filter configuration has a `counts` property set to `true`, then the array provided for
// that filter will also have a `count` property for each value. This has a performance
// impact.

var _ = require('@sailshq/lodash');
var async = require('async');

module.exports = {
  extend: 'apostrophe-custom-pages',

  construct: function (self, options) {

    self.showPage = function (req, callback) {

      // We'll try to find the piece as an ordinary reader and, if the piece type
      // is contextual, we'll also try it as an editor if needed

      var doc;
      var previous;
      var next;
      var other;
      return async.series([
        findAsReader,
        findAsEditor,
        findPrevious,
        findNext,
        findOther
      ], function (err) {
        if (err) {
          return callback(err);
        }
        if (!doc) {
          req.notFound = true;
          return callback(null);
        }
        if (self.pieces.contextual) {
          req.contextMenu = _.map(self.contextMenu, function (item) {
            if (item.value) {
              // Don't modify a shared item, race conditions
              // could give us the wrong ids
              item = _.clone(item);
              item.value = doc._id;
            }
            return item;
          });
          req.publishMenu = _.map(self.publishMenu, function (item) {
            if (item.value) {
              // Don't modify a shared item, race conditions
              // could give us the wrong ids
              item = _.clone(item);
              item.value = doc._id;
            }
            return item;
          });
        }
        req.template = self.renderer('show');
        req.data.piece = doc;
        req.data.previous = previous;
        req.data.next = next;
        req.data.otherPiece = other;
        return self.beforeShow(req, callback);
      });

      function findOther(callback) {
        var cursor = self.pieces.find(req, {
          $and: [{
              type: 'fabbisogni'
            },
            {
              slug: {
                $ne: req.params.slug
              }
            }
          ]
        });
        return cursor.sort(false).limit(3).toArray(function (err, _doc) {
          if (err) {
            return callback(err);
          }
          other = _doc;
          return callback(null);
        });
      }

      function findAsReader(callback) {
        var cursor = self.pieces.find(req, {
          slug: req.params.slug
        });
        return cursor.sort(false).toObject(function (err, _doc) {
          if (err) {
            return callback(err);
          }
          doc = _doc;
          return callback(null);
        });
      }

      function findAsEditor(callback) {
        if (doc || (!req.user) || (!self.pieces.contextual)) {
          return callback(null);
        }
        // Use findForEditing to allow subclasses to extend the set of filters that
        // don't apply by default in an editing context. -Tom
        var cursor = self.pieces.findForEditing(req, {
          slug: req.params.slug
        });
        return cursor.sort(false).toObject(function (err, _doc) {
          if (err) {
            return callback(err);
          }
          doc = _doc;
          return callback(null);
        });
      }

      function findPrevious(callback) {
        if (!self.options.previous) {
          return callback(null);
        }
        if (!doc) {
          return callback(null);
        }
        var cursor = self.indexCursor(req);
        return cursor.previous(doc)
          .applyFilters(
            typeof (self.options.previous) === 'object' ?
            self.options.previous : {}
          )
          .toObject(function (err, _previous) {
            if (err) {
              return callback(err);
            }
            previous = _previous;
            return callback(null);
          });
      }

      function findNext(callback) {
        if (!self.options.next) {
          return callback(null);
        }
        if (!doc) {
          return callback(null);
        }
        var cursor = self.indexCursor(req);
        return cursor.next(doc)
          .applyFilters(
            typeof (self.options.next) === 'object' ?
            self.options.next : {}
          )
          .toObject(function (err, _next) {
            if (err) {
              return callback(err);
            }
            next = _next;
            return callback(null);
          });
      }

    };




  }
};