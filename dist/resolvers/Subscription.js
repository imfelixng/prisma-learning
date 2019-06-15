"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Subscription = {
  comment: {
    subscribe: function subscribe(parent, _ref, _ref2, info) {
      var postId = _ref.postId;
      var prisma = _ref2.prisma;
      var userId = (0, _getUserId["default"])(request);
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId // Don't recieve notify when comment in other post

            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, _ref3, info) {
      var prisma = _ref3.prisma;
      return prisma.subscription.post({
        where: {
          node: {
            published: true // Only recieve notify when published equal true

          }
        }
      }, info);
    }
  },
  myPosts: {
    subscribe: function subscribe(parent, args, _ref4, info) {
      var prisma = _ref4.prisma,
          request = _ref4.request;
      var userId = (0, _getUserId["default"])(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info);
    }
  }
};
var _default = Subscription;
exports["default"] = _default;