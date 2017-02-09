import noble from 'noble';
import PeripheralService from '../services/peripheralService'
import express from 'express';
let router = express.Router();

// initialize PeripheralService
// TODO initialize elsewhere
let peripheralService = new PeripheralService();
try {
	peripheralService.startScanAndConnectToBleLamps();
}catch (err){
	console.warn(err.message);	
}

router.get('/', (req, res) => {
	res.render('index', { title: 'bleLamps' });
});

router.get('/color/:color', (req, res)=>{
	peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
	res.render('index', { title: `color ${req.params.color} set` });
})

export {router as bleLamps};
