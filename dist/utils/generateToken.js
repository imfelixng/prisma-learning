"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(payload) {
  return _jsonwebtoken["default"].sign(payload, 'mysupersecret', {
    expiresIn: '1d'
  });
};

exports["default"] = generateToken;