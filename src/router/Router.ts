import express = require('express')
export class Router {
    public router: express.Router;
    public type: string = "";
    constructor() {
        this.router = express.Router();
        this.router.use((req, res, next) => {
            console.log('Time: ', Date.now())
            next();
        });
    }
}