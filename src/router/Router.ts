import express = require('express')
export class Router {
    router: express.Router;
    type: string = "";
    constructor() {
        this.router = express.Router();
        this.router.use((req, res, next) => {
            console.log('Time: ', Date.now())
            next();
        });
    }
}