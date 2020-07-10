class Config {
    public contentRoot: String = "/content";
    public staticRoot: string = "/static"
    public themeRoot: String = "/theme";
    public themeName: String = "default";
    public port: Number = 3000;
    constructor() {
    }
    load(): void {
    }
}

export const config: Config = new Config();