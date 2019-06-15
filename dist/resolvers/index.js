"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentReplacements = exports.resolvers = void 0;

var _prismaBinding = require("prisma-binding");

var _Query = _interopRequireDefault(require("./Query"));

var _Mutation = _interopRequireDefault(require("./Mutation"));

var _Subscription = _interopRequireDefault(require("./Subscription"));

var _customs = _interopRequireDefault(require("./customs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resolvers = _objectSpread({
  Query: _Query["default"],
  Mutation: _Mutation["default"]
}, _customs["default"], {
  Subscription: _Subscription["default"]
});

exports.resolvers = resolvers;
var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);
exports.fragmentReplacements = fragmentReplacements;