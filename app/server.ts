import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cookieSession = require('cookie-session');
import expressVue = require('express-vue');

import * as Routers from './routes';
import * as Middleware from './middleware';

export class Server {

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.attachRoutes();
        this.attachErrorHandler();
        this.startServer();
    }

    private config() {
        // dotevn config
        dotenv.config();
        this.app.locals.ENV = process.env.NODE_ENV || 'development';
        this.app.locals.ENV_DEVELOPMENT = this.app.locals.ENV === 'development';
        // view engine setup
        this.app.engine('vue', expressVue);
        this.app.set('view engine', 'vue');
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.set('vue', {
            componentsDir: path.join(__dirname, '/views/components')
        });
        // this.app.use(favicon(__dirname + '/public/img/favicon.ico'));
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
        // db connection initiation
        mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
        // add middleware
        this.app.use(Middleware.Security.checkIfUserLoggedIn);
    }

    private attachRoutes(): void {
        Routers.Main.bootstrap(this.app).attach('/');
        Routers.BleLamps.bootstrap(this.app).attach('/blelamps');
        Routers.Login.bootstrap(this.app).attach('/auth');
    }

    /**
     * development error handler
     * will print stacktrace
     */
    private attachErrorHandler(): void {
        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

        /**
         * production error handler
         * no stacktraces leaked to user
         */
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    }

    private startServer() {
        this.app.set('port', process.env.PORT || 3000);

        const server = this.app.listen(this.app.get('port'), () => {
            console.info('Express server listening on port ' + server.address().port);
        });
    }
}
