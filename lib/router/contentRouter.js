"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const Router_1 = require("./Router");
const ContentFile_1 = require("../content/ContentFile");
const routerUtil_1 = require("../util/routerUtil");
class ContentRouter extends Router_1.Router {
    constructor() {
        super();
        this.excludePath = ["/sys/*", "/api/*"];
        this.type = "content";
        this.router.all(this.excludePath, (req, res) => routerUtil_1.routerUtil.resNotFound(res));
        this.router.get("/favicon.ico", (req, res) => {
            res.send("no icon");
            // TODO: response icon from config.
        });
        this.router.get("/*", (req, res) => {
            let contentFile = new ContentFile_1.ContentFile(req.path, req.query);
            contentFile.response(res);
        });
    }
}
exports.contentRouter = new ContentRouter();
//# sourceMappingURL=contentRouter.js.map