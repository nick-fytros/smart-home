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
            otherData: 'Something Else'
        },
        vue: {
            meta: {
                title: 'Page Title',
                head: [{ name: 'application-name', content: 'Name of my application' }, { name: 'description', content: 'A description of the page', id: 'desc' }]
            }
        }
    });
});

exports.default = router;