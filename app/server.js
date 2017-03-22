const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const cookieSession = require('cookie-session');
const expressVue = require('express-vue');
const requireDir = require('require-dir');
const csrf = require('csurf');
const helmet = require('helmet');

const AppError = require('./models/appError');
const VueScope = require('./models/vueScope');
const Routers = requireDir('./routes');
const Middleware = requireDir('./middleware');
const Schemas = requireDir('./schemas');

/**
 * @export
 * @class Server
 */
class Server {

    /**
     * @static
     * @returns 
     * @memberOf Server
     */
    static bootstrap() {
        return new Server();
    }

    /**
     * Creates an instance of Server.
     * @memberOf Server
     */
    constructor() {
        this.app = express();
        this._configureServer();
        this._configfureDatabase();
        this._attachRoutes();
        this._attachErrorHandler();
        this._startServer();
    }

    /**
     * @memberOf Server
     */
    _configureServer() {
        // dotevn config
        dotenv.config();
        this.app.locals.env = process.env.NODE_ENV || 'development';
        this.app.locals.isEnvDevelopment = this.app.locals.ENV === 'development';
        // express security middleware
        this.app.use(helmet());
        // view engine setup
        this.app.engine('vue', expressVue);
        this.app.set('view engine', 'vue');
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.set('vue', {
            componentsDir: path.join(__dirname, '/views/components'),
            defaultLayout: 'layout'
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
            // Cookie Options
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }));
        this.app.use(csrf({ cookie: true }));
        // add custom middleware
        this.app.use(Middleware.security.checkIfUserIsLoggedIn);
        this.app.use(Middleware.flash.invalidateFlash);
    }

    /**
     * @memberOf Server
     */
    _configfureDatabase() {
        // use native promises
        mongoose.Promise = global.Promise;
        // db connection initiation
        mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
        // create db Schemas
        Schemas.user.bootstrap();
        // create the admin user if he doesn't exist
        const MongooseUser = mongoose.model('User');
        if (process.env.APP_ADMIN_EMAIL && process.env.APP_ADMIN_PASS) {
            MongooseUser.findOne({
                email: process.env.APP_ADMIN_EMAIL
            }).then((user) => {
                if (!user || user == null) {
                    const newUser = new MongooseUser({
                        email: process.env.APP_ADMIN_EMAIL,
                        password: process.env.APP_ADMIN_PASS,
                        role: 'admin'
                    });
                    newUser.save().then((user) => {
                    }).catch((error) => {
                        throw error;
                    });
                }
            }).catch((error) => {
                throw error;
            });
        }
    }

    /**
     * @memberOf Server
     */
    _attachRoutes() {
        Routers.main.bootstrap(this.app).attach('/');
        Routers.blelamps.bootstrap(this.app).attach('/blelamps');
        Routers.auth.bootstrap(this.app).attach('/auth');
        Routers.admin.bootstrap(this.app).attach('/admin');
    }

    /**
     * development error handler
     * will print stacktrace
     * @memberOf Server
     */
    _attachErrorHandler() {
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            const error = new AppError('The page you were looking for was not found', 404);
            next(error);
        });
        const vueScope = new VueScope();
        if (this.app.get('env') === 'development') {
            this.app.use((err, req, res, next) => {
                vueScope.addData({
                    error: err
                });
                res.status(err.status || 500);
                res.render('error', vueScope);
            });
        }

        /**
         * production error handler
         * no stacktraces leaked to user
         */
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            delete err.stack;
            vueScope.addData(err);
            res.render('error', vueScope);
        });
    }

    /**
     * @memberOf Server
     */
    _startServer() {
        this.app.set('port', process.env.PORT || 3000);

        const server = this.app.listen(this.app.get('port'), () => {
            console.info('Express server listening on port ' + server.address().port);
        });
    }
}

module.exports = Server;