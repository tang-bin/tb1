"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sysRouter = void 0;
const Router_1 = require("./Router");
class SysRouter extends Router_1.Router {
    constructor() {
        super();
        this.type = "sys";
        this.router.get("/", (req, res) => res.send("sys root"));
        this.router.get("/*", (req, res) => {
            const n = req.path;
            res.send("sys " + n);
        });
    }
}
exports.sysRouter = new SysRouter();
//# sourceMappingURL=sysRouter.js.map