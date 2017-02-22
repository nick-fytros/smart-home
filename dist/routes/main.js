'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('main/main', {
        data: {
            otherData: 'Main page'
        },
        vue: {
            meta: {
                title: 'Smart Home by Nikos',
                head: [{ name: 'application-name', content: 'Smart Home by Nikos' }, { name: 'description', content: 'Smart Home by Nikos Fytros', id: 'desc' }, { style: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' }, { style: 'css/style.css' }]
            },
            components: ['smheader', 'smfooter']
        }
    });
});

exports.default = router;