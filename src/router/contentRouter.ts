import { Router } from './Router';
import { Path } from '../util/Path';

class ContentRouter extends Router {

    static EXCLUDE_PATH: Array<string> = ["sys", "api", "file", "v1"];
    constructor() {
        super();
        this.type = "content";
        this.router.get("/*", (req, res) => {
            let path: Path = new Path(req.path, req.query);
            if (ContentRouter.EXCLUDE_PATH.includes(path.first)) {
                res.send("not allow");
                // TODO: 404
            } else {
                res.send("other content");
                // TODO: look for page.
            }
        });
    }
}

export const contentRouter = new ContentRouter();