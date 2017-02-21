let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressVue = require('express-vue');

import * as routers from './routes';

let app = express();

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routers.main);
app.use('/blelamps', routers.blelamps);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            data: {
                error: err
            },
            vue: {
                meta: {
                    title: 'Something went wrong',
                    head: [
                        { name: 'application-name', content: 'Smart home' },
                        { name: 'description', content: 'Error page', id: 'desc' }
                    ]
                }
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        data: {
            error: ''
        },
        vue: {
            meta: {
                title: 'Page Title',
                head: [
                    { name: 'application-name', content: 'Smart home' },
                    { name: 'description', content: 'Error page', id: 'desc' }
                ]
            }
        }
    });
});

export { app };