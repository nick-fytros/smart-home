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
    getDiscoveredBleBulbPeripheralsData() {
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
    getConnectedBleBulbPeripheralsData() {
        let connectedPeripheralData = [];
        for (let peripheralId in this.connectedPeripherals) {
            connectedPeripheralData.push({
                id: this.connectedPeripherals[peripheralId].peripheral.id,
                name: this.connectedPeripherals[peripheralId].peripheral.advertisement.localName,
                state: this.connectedPeripherals[peripheralId].peripheral.state,
                color: this.connectedPeripherals[peripheralId].color,
                previousColor: this.connectedPeripherals[peripheralId].previousColor,
                customName: this.connectedPeripherals[peripheralId].customName
            });
        }
        return connectedPeripheralData;
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
                /* discover the only writable service */
                peripheral.discoverServices(['ffe5'], (error, services) => {
                    if (error) {
                        reject(error);
                    }
                    const colorService = services[0];
                    /* discover the only writable characteristic */
                    colorService.discoverCharacteristics(['ffe9'], (error, characteristics) => {
                        if (error) {
                            reject(error);
                        }
                        /* save the connected peripheral with its writable characteristic */
                        this.connectedPeripherals[peripheral.id] = {
                            peripheral: peripheral,
                            color: peripheral.color || '',
                            previousColor: peripheral.previousColor || '',
                            customName: peripheral.customName || '',
                            colorCharacteristic: characteristics[0]
                        };
                        /* on peripheral disconnect, reconnect */
                        peripheral.once('disconnect', () => {
                            console.log('peripheral disconnected...');
                            delete this.connectedPeripherals[peripheral.id];
                            this.connectToPeripheralAndInit(peripheral);
                        });

                        resolve(this.getConnectedBleBulbPeripheralsData());
                    });
                });
            }); 
        });
    }

    /**
     * @param {Noble.Peripheral} peripheral 
     * @param {String} color
     */
    setBulbColor(peripheral, color) {
        const colorCommand = '56' + color.replace('#','') + '00f0aa';
        return new Promise((resolve, reject) => {
            peripheral.colorCharacteristic.write(new Buffer(colorCommand, 'hex'), true, (error) => {
                if (error) {
                    reject(error);
                }
                /* save color and previous color set to the peripheral */
                this.connectedPeripherals[peripheral.peripheral.id].previousColor = this.connectedPeripherals[peripheral.peripheral.id].color;
                this.connectedPeripherals[peripheral.peripheral.id].color = color;
                resolve(this.getConnectedBleBulbPeripheralsData());
            });
        });
    }

    /**
     * @param {Noble.Peripheral} peripheral 
     * @param {String} customName
     */
    setBulbCustomName(peripheral, customName) {
        this.connectedPeripherals[peripheral.peripheral.id].customName = customName;
    }
}

module.exports = PeripheralService;
