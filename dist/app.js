'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressVue = require('express-vue');

var _expressVue2 = _interopRequireDefault(_expressVue);

var _routes = require('./routes');

var routers = _interopRequireWildcard(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.locals.ENV = process.env.NODE_ENV || 'development';
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development';

// view engine setup
app.engine('vue', _expressVue2.default);
app.set('view engine', 'vue');
app.set('views', _path2.default.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: _path2.default.join(__dirname, '/views/components')
});

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

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