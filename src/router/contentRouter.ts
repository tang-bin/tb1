import { Router } from './Router';
import { ContentFile } from '../content/ContentFile';
import { routerUtil } from '../util/routerUtil';

class ContentRouter extends Router {

    private excludePath: Array<string> = ["/sys/*", "/api/*", "/static/*", "/v1/*"];

    constructor() {
        super();
        this.type = "content";
        this.router.all(this.excludePath, (req, res) => routerUtil.resNotFound(res));
        this.router.get("/favicon.ico", (req, res) => {
            res.send("no icon");
            // TODO: response icon from config.
        });
        this.router.get("/*", (req, res) => {
            let contentFile: ContentFile = new ContentFile(req.path, req.query);
            contentFile.response(res);
        });
    }
}

export const contentRouter = new ContentRouter();