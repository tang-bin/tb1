import { Router } from './Router';

class ContentRouter extends Router {

    constructor() {
        super();
        this.type = "content";
        this.router.get("/", (req, res) => {
            res.send("content root")
        });
        this.router.get("/*", (req, res) => {
            res.send("other content")
        });
        // this.router.get("/*", (req, res) => res.send("content not root"));
    }
}

export const contentRouter = new ContentRouter();