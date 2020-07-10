import { Router } from './Router';

class APIRouter extends Router {

    constructor() {
        super();
        this.type = "api";
        this.router.get("/", (req, res) => res.send("api root"));
        this.router.get("/*", (req, res) => {
            const n: string = req.path;
            res.send("api " + n);
        });
    }
}

export const apiRouter: APIRouter = new APIRouter();