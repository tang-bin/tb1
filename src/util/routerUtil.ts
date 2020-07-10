import path = require("path");
import { config } from "../config";
import { fileUtil } from "./fileUtil";
class RouterUtil {
    public resNotFound(res: any): void {
        res.status(404);
        const filePath: string = path.resolve(config.contentRoot, "404.html");
        if (fileUtil.exists(filePath)) res.sendFile(filePath);
        else res.send("404 not found");
    }
    public resError(res: any): void {
        res.status(503);
        const filePath: string = path.resolve(config.contentRoot, "error.html");
        if (fileUtil.exists(filePath)) res.sendFile(filePath);
        else res.send("503 internal error");
    }
}

export const routerUtil: RouterUtil = new RouterUtil();