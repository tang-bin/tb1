import { Router } from './Router';

class SysRouter extends Router {

    constructor() {
        super();
        this.type = "sys";
        this.router.get("/", (req, res) => res.send("sys root"));
    }
}

export const sysRouter = new SysRouter();