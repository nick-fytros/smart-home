"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cookieSession = require("cookie-session");
var expressVue = require("express-vue");
var Routers = require("./routes");
var Middleware = require("./middleware");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.attachRoutes();
        this.attachErrorHandler();
        this.startServer();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        dotenv.config();
        this.app.locals.ENV = process.env.NODE_ENV || 'development';
        this.app.locals.ENV_DEVELOPMENT = this.app.locals.ENV === 'development';
        this.app.engine('vue', expressVue);
        this.app.set('view engine', 'vue');
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.set('vue', {
            componentsDir: path.join(__dirname, '/views/components')
        });
        this.app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(cookieSession({
            name: process.env.COOKIESESSION_NAME,
            keys: [process.env.COOKIESESSION_KEY1, process.env.COOKIESESSION_KEY2],
            maxAge: 24 * 60 * 60 * 1000
        }));
        mongoose.connect("mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME);
        this.app.use(Middleware.Security.checkIfUserLoggedIn);
    };
    Server.prototype.attachRoutes = function () {
        Routers.Main.bootstrap(this.app).attach('/');
        Routers.BleLamps.bootstrap(this.app).attach('/blelamps');
        Routers.Auth.bootstrap(this.app).attach('/auth');
    };
    Server.prototype.attachErrorHandler = function () {
        this.app.use(function (req, res, next) {
            var err = new Error();
            err.status = 404;
            next(err);
        });
        if (this.app.get('env') === 'development') {
            this.app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    data: {
                        error: err
                    },
                    vue: {
                        meta: {
                            title: 'Something went wrong',
                            head: [{
                                    name: 'application-name',
                                    content: 'Smart home'
                                },
                                {
                                    name: 'description',
                                    content: 'Error page',
                                    id: 'desc'
                                }
                            ]
                        }
                    }
                });
            });
        }
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                data: {
                    error: ''
                },
                vue: {
                    meta: {
                        title: 'Page Title',
                        head: [{
                                name: 'application-name',
                                content: 'Smart home'
                            },
                            {
                                name: 'description',
                                content: 'Error page',
                                id: 'desc'
                            }
                        ]
                    }
                }
            });
        });
    };
    Server.prototype.startServer = function () {
        this.app.set('port', process.env.PORT || 3000);
        var server = this.app.listen(this.app.get('port'), function () {
            console.info('Express server listening on port ' + server.address().port);
        });
    };
    return Server;
}());
exports.Server = Server;
