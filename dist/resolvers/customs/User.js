"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUserId = _interopRequireDefault(require("../../utils/getUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Locking down field
var User = {
  email: {
    fragment: 'fragment userId on User { id }',
    // Get id field with not from info query
    resolve: function resolve(parent, args, _ref, info) {
      var request = _ref.request;
      var userId = (0, _getUserId["default"])(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }

      return null;
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, _ref2, info) {
      var prisma = _ref2.prisma,
          request = _ref2.request;
      return prisma.query.posts({
        where: {
          author: {
            id: parent.id
          },
          published: true
        }
      }, info);
    }
  }
};
var _default = User;
exports["default"] = _default;