"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUserId = function getUserId(request) {
  var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var header = request.request ? request.request.headers.authorization : request.connection.context.authorization;

  if (header) {
    var token = header.replace('Bearer ', '');

    var decoded = _jsonwebtoken["default"].verify(token, 'mysupersecret');

    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication is required');
  }

  return null;
};

exports["default"] = getUserId;