import path = require("path");
import { config } from "../config";
import { fileUtil } from "../util/fileUtil";
import { routerUtil } from "../util/routerUtil";
import { data } from "../data";
import { util } from "../util/util";
import cp = require("child_process");

export class ContentFile {
    private url: string;
    private param: object;
    private _filePath: string = "";
    private _wrapper: string = "";

    constructor(url: string = "", param: object = {}) {
        this.url = url.split("/").filter(s => s).join("/");
        this.param = param;
        this._filePath = this.getFilePath();
        this.findWrapper();
    }

    public get exists(): boolean {
        return Boolean(this._filePath);
    }

    public get filePath(): string {
        return this._filePath;
    }

    public response(res: any): void {
        if (this.exists) {
            console.debug("xxxxxxxxxxxxx", this._wrapper);
            if (this._wrapper) {
                const cmd:string = this._wrapper.replace("$path", this._filePath).replace("$root", config.contentRoot);
                console.debug(cmd);
                cp.exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            }
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
        if (fileUtil.isFile(p1)) return p1;
        else if (fileUtil.isFolder(p1)) {
            const p2: string = p1 + "/index.html";
            if (fileUtil.isFile(p2)) return p2;
        }
        else if (!ext) {
            const p3: string = p1 + "/index.html";
            if (fileUtil.isFile(p3)) return p3;
        }
        return "";
    }

    private findWrapper(): void {
        if (this._filePath && config.wrappers && config.wrappers.length) {
            config.wrappers.some(wrapper => {
                if (wrapper.type === 'file') {
                    this._wrapper = util.endsWith(this._filePath, wrapper.file + wrapper.ext) ? wrapper.dest : "";
                } else if (wrapper.type === "path") {
                    // TODO: Math path
                }
                return Boolean(this._wrapper);
            });
        }
    }
}