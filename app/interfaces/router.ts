/**
 * @interface Router
 */

import * as express from 'express';

export interface IRouter {
    app: express.Application;
    router: express.Router;

    /**
     * Static method called bootstrap
     * but static keyword not supported in ts interface
     * static bootstrap(app: express.Application): object;
     */

    /**
     * Method to attach express.Router to express.Application
     */
    attach(pathToAttach ?: string): void;
}
