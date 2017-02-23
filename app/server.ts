import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as expressVue from 'express-vue';

import * as routers from './routes';

export class Server {

    public app: express.Application;

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

    constructor() {
        this.app = express();
        this.config();
        this.attachRoutes();
        this.attachErrorHandler();
        this.startServer();
    }

    private config() {
        this.app.locals.ENV = process.env.NODE_ENV || 'development';
        this.app.locals.ENV_DEVELOPMENT = this.app.locals.ENV == 'development';

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
    }


    private attachRoutes(): void {
        let router: express.Router;
        router = express.Router();
        // app.use('/', routers.main);
        // app.use('/blelamps', routers.blelamps);
    }

    // development error handler
    // will print stacktrace
    private attachErrorHandler(): void {
        /// catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
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

        // production error handler
        // no stacktraces leaked to user
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
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

        let server = this.app.listen(this.app.get('port'), () => {
            console.info('Express server listening on port ' + server.address().port);
        });
    }
}
