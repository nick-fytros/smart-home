var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('main/main', {
        data: {
            otherData: 'Main page'
        },
        vue: {
            meta: {
                title: 'Smart Home by Nikos',
                head: [
                    { name: 'application-name', content: 'Smart Home by Nikos' },
                    { name: 'description', content: 'Smart Home by Nikos Fytros', id: 'desc' }
                ]
            },
            components: ['smheader', 'smfooter']
        }
    });
});

export default router;