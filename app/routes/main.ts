/**
 * Main router
 * by Nikos Fytros
 */
import express from 'express';
import VueScope from '../models/vueScope';

let router = express.Router();

/* GET home page. */
router.get('/', function (req: object, res: object) {
    let vueScope = new VueScope();
    vueScope.addData({
        title: 'Smart Home',
        subtitle: 'Grünerløkka, Oslo'
    });
    res.render('main/main', vueScope.getScope());
});

export default router;
