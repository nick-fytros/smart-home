'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _routes = require('./routes');

var routers = _interopRequireWildcard(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressVue = require('express-vue');

var app = express();

app.locals.ENV = process.env.NODE_ENV || 'development';
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development';

// view engine setup
app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: '/views/layout'
});

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routers.main);
app.use('/blelamps', routers.blelamps);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            data: {
                error: err
            },
            vue: {
                meta: {
                    title: 'Something went wrong',
                    head: [{ name: 'application-name', content: 'Smart home' }, { name: 'description', content: 'Error page', id: 'desc' }]
                }
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        data: {
            error: ''
        },
        vue: {
            meta: {
                title: 'Page Title',
                head: [{ name: 'application-name', content: 'Smart home' }, { name: 'description', content: 'Error page', id: 'desc' }]
            }
        }
    });
});

exports.app = app;