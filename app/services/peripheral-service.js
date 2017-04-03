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
    constructor(req) {
        this.connectedPeripherals = [];
        this.bleBulbPeripheralsDiscovered = [];
        this.noble;
        let noble = req.app.locals.noble;//.removeAllListeners
        if (noble === null || noble === undefined || noble === {}) {
            try {
                req.app.locals.noble = require('noble');
                noble = req.app.locals.noble;
                this.noble = noble;
            } catch (error) {
                throw error;
            }
        }
        this.noble.removeAllListeners('stageChange');
        this.noble.removeAllListeners('discover');
        this.noble.on('stateChange', (state) => {
            // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
            if (state === 'poweredOn') {
                this.noble.startScanning();
            } else {
                this.noble.stopScanning();
            }
        });
        this.noble.on('discover', (peripheral) => {
            /* find and connect to all the Ble bulbs */
            console.log(peripheral);
            if (typeof peripheral.advertisement.localName !== 'undefined' &&
                peripheral.advertisement.localName.includes('LEDBLE-')) {
                console.log(this.bleBulbPeripheralsDiscovered);
                this.bleBulbPeripheralsDiscovered[peripheral.id] = peripheral;
                console.log(this.bleBulbPeripheralsDiscovered);
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
     * @returns peripheral info array
     * 
     * @memberOf PeripheralService
     */
    getDiscoveredBleBulbPeripherals() {
        let discoveredPeripheralData = [];
        for (let peripheral of this.bleBulbPeripheralsDiscovered) {
            discoveredPeripheralData.push({
                id: peripheral.id,
                name: peripheral.advertisement.localName,
                connectable: peripheral.connectable
            });
        }
        return discoveredPeripheralData;
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
                console.error(error);
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
