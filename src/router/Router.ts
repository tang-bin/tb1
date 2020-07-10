import express = require('express')
import { timeFormatter } from '../util/timeFormatter';
export class Router {
    public router: express.Router;
    public type: string = "";
    constructor() {
        this.router = express.Router();
        this.router.use((req, res, next) => {
            console.log(this.type, ' : ', timeFormatter.format(Date.now()));
            next();
        });
    }
}