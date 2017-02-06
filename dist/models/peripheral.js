"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Peripheral class consists of:
 * 
 * id: "<id>",
 * address: "<BT address">, // Bluetooth Address of device, or 'unknown' if not known
 * addressType: "<BT address type>", // Bluetooth Address type (public, random), or 'unknown' if not known
 * connectable: <connectable>, // true or false, or undefined if not known
 * advertisement: {
 *   localName: "<name>",
 *   txPowerLevel: <int>,
 *   serviceUuids: ["<service UUID>", ...],
 *   serviceSolicitationUuid: ["<service solicitation UUID>", ...],
 *   manufacturerData: <Buffer>,
 *   serviceData: [
 *       {
 *           uuid: "<service UUID>"
 *           data: <Buffer>
 *       },
 *       ...
 *   ]
 * },
 * rssi: <rssi>
 * */

var peripheral = function () {
	function peripheral(_peripheral) {
		_classCallCheck(this, peripheral);

		this.id = _peripheral.id;
		this.address = _peripheral.address;
		this.addressType = _peripheral.addressType;
		this.connectable = _peripheral.connectable;
		this.advertisement = _peripheral.advertisement;
		this.rssi = rssi;
	}

	_createClass(peripheral, [{
		key: "id",
		get: function get() {
			return this.id();
		}
	}, {
		key: "address",
		get: function get() {
			return this.address();
		}
	}, {
		key: "addressType",
		get: function get() {
			return this.addressType();
		}
	}, {
		key: "connectable",
		get: function get() {
			return this.connectable();
		}
	}, {
		key: "advertisement",
		get: function get() {
			return this.advertisement();
		}
	}, {
		key: "rssi",
		get: function get() {
			return this.rssi();
		}
	}]);

	return peripheral;
}();

exports.default = peripheral;