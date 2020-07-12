import path = require("path");
import yaml = require("js-yaml");
import fs = require("fs");
import { util } from "./util/util";
import { fileUtil } from "./util/fileUtil";
import { Argv } from "./util/Argv";

class Config {

    private argv: Argv;

    public appRoot: string = "";
    public contentRoot: string = "";
    public staticRoot: string = ""
    public enableHttps: boolean = false;
    public httpPort: Number = 3000;
    public httpsPort: Number = 8080;
    public keyPath: string = "";
    public crtPath: string = "";
    public cwd: string = "";

    constructor() {
        this.appRoot = path.resolve(__dirname, "..");
        this.cwd = process.cwd();
        this.argv = new Argv(process.argv);
    }

    /**
     * config priority:
     * 
     * 1. argv.
     * 2. config path in argv.
     * 3. ./config.yaml
     * 4. [appRoot]/config.yaml
     */
    public load(): void {
        let configFilePath: string = path.resolve(this.appRoot, "config.yaml")
            , c: any = yaml.safeLoad(this.getConfigFile())
            , d = (p: string) => util.readFromObject(c, p);

        this.contentRoot = this.trimPath(d("server.content"), "content");
        this.keyPath = this.trimPath(d("server.sslKey"), "");
        this.crtPath = this.trimPath(d("server.sslCert"), "");
        //
        this.httpPort = this.trimNum(d("server.port"), 3000);
        this.httpsPort = this.trimNum(d("server.httpsPort"), 8080);
        this.enableHttps = d("server.https") || false;
    }

    private getConfigFile(): string {
        let p: string = "";
        if (this.argv.has("config")) p = path.resolve(this.cwd, this.argv.getParam("config"));
        else if (this.argv.has("c")) p = path.resolve(this.cwd, this.argv.getParam("c"));
        if (p && fileUtil.exists(p)) return fs.readFileSync(p, "utf8");
        //
        p = path.resolve(this.cwd, "config.yaml");
        if (fileUtil.exists(p)) return fs.readFileSync(p, "utf8");
        //
        p = path.resolve(this.appRoot, "config.yaml");
        if (fileUtil.exists(p)) return fs.readFileSync(p, "utf8");
        //
        return ""; // TODO: cannot find config file, throw error.
    }

    private trimPath(p: string, defaultPath: string): string {
        p = (p || "").trim();
        if (!p) p = defaultPath;
        return path.resolve(this.cwd, p);
    }

    private trimNum(n: number, defaultNum: number): number {
        if (n || n === 0) return n;
        else return defaultNum;
    }
}

export const config: Config = new Config();