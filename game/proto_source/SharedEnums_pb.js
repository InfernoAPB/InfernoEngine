/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.com.inferno.protos.RequestType', null, global);
goog.exportSymbol('proto.com.inferno.protos.ResponseStatus', null, global);
goog.exportSymbol('proto.com.inferno.protos.ResponseType', null, global);
/**
 * @enum {number}
 */
proto.com.inferno.protos.RequestType = {
  REQUEST_NONE: 0,
  STARTUP: 1,
  CREATE_NEW_USER: 2,
  LOAD_STRUCTURES: 3,
  IN_APP_PURCHASE: 4
};

/**
 * @enum {number}
 */
proto.com.inferno.protos.ResponseType = {
  RESPONSE_NONE: 0,
  STARTUP_RESPONSE: 1,
  CREATE_NEW_USER_RESPONSE: 2,
  LOAD_STRUCTURES_RESPONSE: 3,
  IN_APP_PURCHASE_RESPONSE: 4
};

/**
 * @enum {number}
 */
proto.com.inferno.protos.ResponseStatus = {
  RESPONSE_STATUS_NONE: 0,
  SUCCESS: 1,
  FAIL: 2,
  USER_EXIST: 3
};

goog.object.extend(exports, proto.com.inferno.protos);
