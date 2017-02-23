/**
 * Main router
 * by Nikos Fytros
 */
import * as express from 'express';
import VueScope from '../models/vueScope';
let router: express.Router;

router = express.Router();
/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response) {
    let vueScope = new VueScope();
    vueScope.addData({
        title: 'Smart Home',
        subtitle: 'Grünerløkka, Oslo'
    });
    res.render('main/main', vueScope.getScope());
});

export default router;
