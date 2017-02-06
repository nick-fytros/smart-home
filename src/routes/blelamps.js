import noble from 'noble';
import express from 'express';
let router = express.Router();
let connectedPeripherals = [];
let changeColorCharecteristic;

router.get('/', (req, res) => {
	noble.on('stateChange', function(state) {
		// possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
		if (state === 'poweredOn') {
			noble.startScanning();
		} else {
			noble.stopScanning();
		}
	});
	if (noble.state === 'poweredOn'){
		noble.startScanning();
	}
	noble.on('discover', function(peripheral) {
		if (peripheral.advertisement.localName === 'LEDBLE-7860485E'){
			noble.stopScanning();
			connectedPeripherals.push(peripheral);
			peripheral.connect(function(error) {
				if (error){
					console.log(error);
				}
				/* discover the only writable service */
				peripheral.discoverServices(['ffe5'], function(error, services) {
					if (error){
						console.log(error);
					}
					let changeColorService = services[0];
					/* discover the only writable characteristic */
					changeColorService.discoverCharacteristics(['ffe9'], function(error, characteristics) {
						if (error){
							console.log(error);
						}
						changeColorCharecteristic = characteristics[0];
					});
				});
			});
			peripheral.once('disconnect', function() {
				console.log('peripheral disconnected...');
				peripheral.connect(function(error) {
					if (error){
						console.log(error);
					}
					/* discover the only writable service */
					peripheral.discoverServices(['ffe5'], function(error, services) {
						if (error){
							console.log(error);
						}
						let changeColorService = services[0];
						/* discover the only writable characteristic */
						changeColorService.discoverCharacteristics(['ffe9'], function(error, characteristics) {
							if (error){
								console.log(error);
							}
							console.log('peripheral reconnected');
							changeColorCharecteristic = characteristics[0];
						});
					});
				});
			});
		}
	});
	res.send('ok');
});

router.get('/color/:color', (req, res)=>{
	let colorCommand = '56' + req.params.color + '00f0aa';
	changeColorCharecteristic.write(new Buffer(colorCommand,'hex'), true, function(error) {
		if (error){
				console.log(error);
		}
		/* color set */
	});
	res.send('done');
})

export {router as bleLamps};
