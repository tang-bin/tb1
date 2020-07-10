class Config {
    contentRoot: String;
    themeRoot: String;
    themeName: String;
    port: Number;
    constructor() {
        this.contentRoot = "./content";
        this.themeRoot = "./theme";
        this.themeName = "default"
        this.port = 3000;
    }
    load() {

    }
}

export const config: Config = new Config();