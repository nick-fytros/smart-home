/**
 * @export
 * @class PeripheralService
 */
class PeripheralService {

    /**
     * Creates an instance of PeripheralService.
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
            if (typeof(peripheral.advertisement.localName) !== 'undefined' &&
                peripheral.advertisement.localName.includes('LEDBLE-')) {
                this.bleBulbPeripheralsDiscovered[peripheral.id] = peripheral;
            }
        });
    }

    /**
     * @returns all the discovered ble bulb peripherals
     */
    getDiscoveredPeripherals() {
        return this.bleBulbPeripheralsDiscovered;
    }

    /**
     * @returns all the connected ble bulb peripherals
     */
    getConnectedPeripherals() {
        return this.connectedPeripherals;
    }

    /**
     * @returns discovered peripheral info array
     */
    getDiscoveredBleBulbPeripherals() {
        let discoveredPeripheralData = [];
        for (let peripheralId in this.bleBulbPeripheralsDiscovered) {
            discoveredPeripheralData.push({
                id: this.bleBulbPeripheralsDiscovered[peripheralId].id,
                name: this.bleBulbPeripheralsDiscovered[peripheralId].advertisement.localName,
                connectable: this.bleBulbPeripheralsDiscovered[peripheralId].connectable,
                state: this.bleBulbPeripheralsDiscovered[peripheralId].state
            });
        }
        return discoveredPeripheralData;
    }

    /**
     * @returns connected peripheral info array
     */
    getConnectedBleBulbPeripherals() {
        let connectedPeripheralData = [];
        for (let peripheralId in this.connectedPeripherals) {
            connectedPeripheralData.push({
                id: this.connectedPeripherals[peripheralId].peripheral.id,
                name: this.connectedPeripherals[peripheralId].peripheral.advertisement.localName,
                connectable: this.connectedPeripherals[peripheralId].peripheral.connectable,
                state: this.connectedPeripherals[peripheralId].peripheral.state,
                color: this.connectedPeripherals[peripheralId].color
            });
        }
        return connectedPeripheralData;
    }

    /**
     * @param {Noble.Peripheral} peripheral 
     * @param {String} color
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
     */
    connectToPeripheralAndInit(peripheral) {
        return new Promise((resolve, reject) => {
           peripheral.connect((error) => {
            if (error) {
                reject(error);
            }
            console.log('connected to lamp ' + peripheral.advertisement.localName);
            /* discover the only writable service */
            peripheral.discoverServices(['ffe5'], (error, services) => {
                if (error) {
                    reject(error);
                }
                const colorService = services[0];
                console.log('discovered service ' + colorService);
                /* discover the only writable characteristic */
                colorService.discoverCharacteristics(['ffe9'], (error, characteristics) => {
                    if (error) {
                        reject(error);
                    }
                    const colorCharecteristic = characteristics[0];
                    console.log('discovered characteristic ' + colorCharecteristic);
                    /* save the connected peripheral with its writable characteristic */
                    this.connectedPeripherals[peripheral.id] = {
                        peripheral: peripheral,
                        color: ''
                    };
                    /* on peripheral disconnect, reconnect */
                    peripheral.once('disconnect', () => {
                        console.log('peripheral disconnected...');
                        delete this.connectedPeripherals[peripheral.id];
                        this.connectToPeripheralAndInit(peripheral);
                    });

                    resolve(this.getConnectedBleBulbPeripherals());
                });
            });
        }); 
        });
    }
}

module.exports = PeripheralService;
