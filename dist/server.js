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
var fs = require("fs");
var cookieSession = require("cookie-session");
var expressVue = require("express-vue");
var smError_1 = require("./models/smError");
var vueScope_1 = require("./models/vueScope");
var Routers = require("./routes");
var Middleware = require("./middleware");
var Server = (function () {
    function Server() {
        this.app = express();
        this.configureServer();
        this.configfureDatabase();
        this.attachRoutes();
        this.attachErrorHandler();
        this.startServer();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.configureServer = function () {
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
        this.app.use(Middleware.Security.checkIfUserLoggedIn);
    };
    Server.prototype.configfureDatabase = function () {
        mongoose.connect("mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME);
        fs.readdirSync(path.join(__dirname, '/schemas')).forEach(function (file) {
            require('./schemas/' + file);
        });
    };
    Server.prototype.attachRoutes = function () {
        Routers.Main.bootstrap(this.app).attach('/');
        Routers.BleLamps.bootstrap(this.app).attach('/blelamps');
        Routers.Auth.bootstrap(this.app).attach('/auth');
    };
    Server.prototype.attachErrorHandler = function () {
        this.app.use(function (req, res, next) {
            var error = new smError_1.default('The page you were looking for is not found', 404);
            next(error);
        });
        var vueScope = new vueScope_1.default();
        if (this.app.get('env') === 'development') {
            this.app.use(function (err, req, res, next) {
                vueScope.addData({
                    error: err
                });
                res.status(err.status || 500);
                res.render('error', vueScope);
            });
        }
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            delete err.stack;
            vueScope.addData(err);
            res.render('error', vueScope);
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
