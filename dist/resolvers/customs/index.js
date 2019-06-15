"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("./User"));

var _Post = _interopRequireDefault(require("./Post"));

var _Comment = _interopRequireDefault(require("./Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  User: _User["default"],
  Post: _Post["default"],
  Comment: _Comment["default"]
};
exports["default"] = _default;