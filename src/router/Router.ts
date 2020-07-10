import express = require('express')
import { formatUtil } from '../util/formatUtil';
export class Router {
    public router: express.Router;
    public type: string = "";
    constructor() {
        this.router = express.Router();
        this.router.use((req, res, next) => {
            console.log(this.type, ' : ', formatUtil.time(Date.now()));
            next();
        });
    }
}