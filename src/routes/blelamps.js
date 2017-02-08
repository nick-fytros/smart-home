import noble from 'noble';
import PeripheralService from '../services/peripheralService'
import express from 'express';
let router = express.Router();

// initialize PeripheralService
// TODO initialize elsewhere
let peripheralService = new PeripheralService();

router.get('/', (req, res) => {
	try {
		peripheralService.startScanAndConnectToBleLamps();
	}catch (err){
		console.warn(err);
		res.send('error' + err.message);	
	}
	res.render('index', { title: 'bleLamps' });
});

router.get('/color/:color', (req, res)=>{
	res.send();
})

export {router as bleLamps};
