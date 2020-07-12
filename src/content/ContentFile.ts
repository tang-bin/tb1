import fs = require("fs");
import path = require("path");
import { config } from "../config";
import { fileUtil } from "../util/fileUtil";
import { routerUtil } from "../util/routerUtil";
import { data } from "../data";

export class ContentFile {
    private url: string;
    private param: object;
    private _filePath: string = "";

    constructor(url: string = "", param: object = {}) {
        this.url = url.split("/").filter(s => s).join("/");
        this.param = param;
        this._filePath = this.getFilePath();
    }

    public get exists(): boolean {
        return Boolean(this._filePath);
    }

    public get filePath(): string {
        return this._filePath;
    }

    public response(res: any): void {
        if (this.exists) {
            if (data.isPage(this._filePath)) {
                res.send("find the page, need special handling");
            } else res.sendFile(this._filePath);
        }
        else routerUtil.resNotFound(res);
    }

    private getFilePath(): string {
        let dir: string = path.dirname(this.url)
            , fileName: string = path.basename(this.url)
            , ext: string = path.extname(this.url);
        const p1: string = path.resolve(config.contentRoot, dir, fileName);
        if (fileUtil.exists(p1)) return p1;
        else if (!ext) {
            const p2: string = p1 + ".html", p3: string = p1 + "/index.html";
            if (fileUtil.exists(p2)) return p2;
            else if (fileUtil.exists(p3)) return p3;
        }
        return "";
    }
}