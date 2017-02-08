import noble from 'noble';
import PeripheralService from './services/peripheralService'
import express from 'express';
let router = express.Router();

// initialize PeripheralService
// TODO initialize elsewhere
let peripheralService = new PeripheralService();
peripheralService.startScanAndConnectToBleLamps();

router.get('/', (req, res) => {
	res.send('ok');
});

router.get('/color/:color', (req, res)=>{
	res.send();
})

export {router as bleLamps};
