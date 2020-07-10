import { Router } from './Router';

class APIRouter extends Router {

    constructor() {
        super();
        this.type = "api";
        this.router.get("/", (req, res) => res.send("api root"));
    }
}

export const apiRouter = new APIRouter();