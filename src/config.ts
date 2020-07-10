import path = require("path");

class Config {
    public appRoot: string = "";
    public contentRoot: string = "";
    public staticRoot: string = ""
    public themeRoot: string = "";
    public themeName: string = "default";
    public port: Number = 3000;
    constructor() {
        this.appRoot = path.resolve(__dirname, "..");
    }
    public load(): void {
        this.contentRoot = this.trimPath("", "content");
        this.staticRoot = this.trimPath("", "static");
        this.themeRoot = this.trimPath("", "theme");
    }

    private trimPath(p: string, defaultPath: string): string {
        p = (p || "").trim();
        if (!p) p = defaultPath;
        return path.resolve(this.appRoot, p);
    }
}

export const config: Config = new Config();