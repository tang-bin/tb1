import express = require('express')
import { formatUtil } from '../util/formatUtil';
import { sysLog } from '../util/sysLog';
export class Router {
    public router: express.Router;
    public type: string = "";
    constructor() {
        this.router = express.Router();
        this.router.use((req, res, next) => {
            sysLog.log(this.type, ' : ', formatUtil.time(Date.now()));
            next();
        });
    }
}