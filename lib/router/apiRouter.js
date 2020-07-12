"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const Router_1 = require("./Router");
class APIRouter extends Router_1.Router {
    constructor() {
        super();
        this.type = "api";
        this.router.get("/", (req, res) => res.send("api root"));
        this.router.get("/*", (req, res) => {
            const n = req.path;
            res.send("api " + n);
        });
    }
}
exports.apiRouter = new APIRouter();
//# sourceMappingURL=apiRouter.js.map