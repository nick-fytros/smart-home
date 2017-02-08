import noble from 'noble';
import NobleError from '../models/nobleError';

export default class PeripheralService {
    constructor() {
        this.connectedPeripherals = [];
        noble.stopScanning();
        noble.on('stateChange', function (state) {
            // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
            if (state === 'poweredOn') {
                noble.startScanning();
            } else {
                noble.stopScanning();
            }
        });
    }

    /* TODO handle errors */
    _connectToPeripheralAndInit(peripheral) {
        peripheral.connect(function (error) {
            if (error) {
                console.warn(error);
            }
			console.log('connected to lamp ' + peripheral.advertisement.localName);
            /* discover the only writable service */
            peripheral.discoverServices(['ffe5'], function (error, services) {
                if (error) {
                    console.warn(error);
                }
                let colorService = services[0];
				console.log('discovered service ' + colorService.uuid);
                /* discover the only writable characteristic */
                colorService.discoverCharacteristics(['ffe9'], function (error, characteristics) {
                    if (error) {
                        console.warn(error);
                    }
                    let colorCharecteristic = characteristics[0];
					console.log('discovered characteristic ' + colorCharecteristic);
                    /* save the connected peripheral with its writable characteristic */
                    this.connectedPeripherals.push({
                        'peripheral': peripheral,
                        'colorCharecteristic': colorCharecteristic,
						'currentColor': ''
                    });
                    return null;
                });
            });
        });
    }

    startScanAndConnectToBleLamps() {
		noble.on('discover', function (peripheral) {
            /* find and connect to all the Ble lamps */
            if (peripheral.advertisement.localName.includes('LEDBLE-')) {
                noble.stopScanning();
                this._connectToPeripheralAndInit(peripheral);
            }
        });
        noble.stopScanning();
        /* reset the connected peripherals array */
        this.connectedPeripherals = [];
        if (noble.state === 'poweredOn') {
            noble.startScanning();
			console.log('started scanning');
        } else {
            throw new NobleError(`Noble state is ${noble.state} and can't start scanning.`);
        }
    }

    setLampColor(peripheral, color) {
		let colorCommand = '56' + req.params.color + '00f0aa';
        changeColorCharecteristic.write(new Buffer(colorCommand, 'hex'), true, function (error) {
            if (error) {
				console.warn(error);
				throw new NobleError(error.message);
            }
			console.log('set color ' + colorCommand);
            /* save color set to the peripheral it belongs */
			let peripheralIndex = this.connectedPeripherals.findIndex(function(obj){
				return obj.id === peripheral.id;
			});
			if (peripheralIndex > 0){
				this.connectedPeripherals[peripheralIndex].currentColor = req.params.color;
			}
			console.log('final connected peripherals array is ' + this.connectedPeripherals);
        });
    }
}


// peripheral.once('disconnect', function () {
//     console.log('peripheral disconnected...');
//     peripheral.connect(function (error) {
//         if (error) {
//             console.log(error);
//         }
//         /* discover the only writable service */
//         peripheral.discoverServices(['ffe5'], function (error, services) {
//             if (error) {
//                 console.log(error);
//             }
//             let changeColorService = services[0];
//             /* discover the only writable characteristic */
//             changeColorService.discoverCharacteristics(['ffe9'], function (error, characteristics) {
//                 if (error) {
//                     console.log(error);
//                 }
//                 console.log('peripheral reconnected');
//                 changeColorCharecteristic = characteristics[0];
//             });
//         });
//     });
// });
