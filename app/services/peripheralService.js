const noble = require('noble');
/**
 * @export
 * @class PeripheralService
 */
class PeripheralService {

    /**
     * Creates an instance of PeripheralService.
     * 
     * @memberOf PeripheralService
     */
    constructor() {
        this.connectedPeripherals = [];
        noble.stopScanning();
        noble.on('stateChange', (state) => {
            // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
            if (state === 'poweredOn') {
                console.log('Noble started scanning');
                noble.startScanning();
            } else {
                noble.stopScanning();
            }
        });
        noble.on('discover', (peripheral) => {
            /* find and connect to all the Ble lamps */
            if (typeof peripheral.advertisement.localName !== 'undefined' &&
                peripheral.advertisement.localName.includes('LEDBLE-')) {
                noble.stopScanning();
                this._connectToPeripheralAndInit(peripheral);
            }
        });
    }

    /**
     * @returns 
     * 
     * @memberOf PeripheralService
     */
    getConnectedPeripherals() {
        return this.connectedPeripherals;
    }

    /**
     * @memberOf PeripheralService
     */
    startScanAndConnectToBleLamps() {
        noble.stopScanning();
        /* reset the connected peripherals array */
        this.connectedPeripherals = [];
        if (noble.state === 'poweredOn') {
            noble.startScanning();
            console.log('Noble started scanning');
        } else {
            throw new Error(`Noble state is ${noble.state} and can't start scanning.`);
        }
    }

    /**
     * @param {Noble.Peripheral} peripheral 
     * @param {String} color 
     * 
     * @memberOf PeripheralService
     */
    setLampColor(peripheral, color) {
        let colorCommand = '56' + color + '00f0aa';
        let peripheralIndex = this.connectedPeripherals.findIndex((obj) => {
            return obj.id === peripheral.id;
        });
        if (peripheralIndex < 0) {
            throw new Error(`Peripheral ${peripheral.advertisement.localName} is not connected`);
        }
        peripheral.colorCharecteristic.write(new Buffer(colorCommand, 'hex'), true, (error) => {
            if (error) {
                console.warn(error);
                throw new Error(error.message);
            }
            console.log('set color ' + color);
            /* save color set to the peripheral it belongs */
            this.connectedPeripherals[peripheralIndex].currentColor = color;
            console.log('final connected peripherals array is ' + this.connectedPeripherals.length);
        });
    }

    /**
     * @param {Noble.Peripheral} peripheral 
     * 
     * @memberOf PeripheralService
     */
    _connectToPeripheralAndInit(peripheral) {
        peripheral.connect((error) => {
            if (error) {
                console.warn(error);
                return null;
            }
            console.log('connected to lamp ' + peripheral.advertisement.localName);
            /* discover the only writable service */
            peripheral.discoverServices(['ffe5'], (error, services) => {
                if (error) {
                    console.warn(error);
                    return null;
                }
                const colorService = services[0];
                console.log('discovered service ' + colorService);
                /* discover the only writable characteristic */
                colorService.discoverCharacteristics(['ffe9'], (error, characteristics) => {
                    if (error) {
                        console.warn(error);
                        return null;
                    }
                    const colorCharecteristic = characteristics[0];
                    console.log('discovered characteristic ' + colorCharecteristic);
                    /* save the connected peripheral with its writable characteristic */
                    this.connectedPeripherals.push({
                        'peripheral': peripheral,
                        'colorCharecteristic': colorCharecteristic,
                        'currentColor': ''
                    });
                    /* on peripheral disconnect, reconnect */
                    peripheral.once('disconnect', () => {
                        console.log('peripheral disconnected...');
                        const peripheralIndex = this.connectedPeripherals.findIndex((obj) => {
                            return obj.id === peripheral.id;
                        });
                        if (peripheralIndex >= 0) {
                            this.connectedPeripherals.splice(peripheralIndex, 1);
                        }
                        this.connectToPeripheralAndInit(peripheral);
                    });
                });
            });
        });
    }
}

module.exports = PeripheralService;
