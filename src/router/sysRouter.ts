import { Router } from './Router';

class SysRouter extends Router {

    constructor() {
        super();
        this.type = "sys";
        this.router.get("/", (req, res) => res.send("sys root"));
        this.router.get("/*", (req, res) => {
            const n: string = req.path;
            res.send("sys " + n);
        });
    }
}

export const sysRouter = new SysRouter();