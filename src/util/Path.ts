export class Path {
    private origPath: string;
    private origParam: object;
    private sections: Array<string>;
    private root: boolean;

    constructor(path: string = "", param: object = {}) {
        this.origPath = path;
        this.origParam = param;
        this.root = path.charAt(0) === "/";
        this.sections = path.split("/")
            .map(v => String(v).trim().toLowerCase())
            .filter(v => v && v !== "/");
    }
    public getSection(index: number): String {
        return this.sections[index];
    }

    public get first(): string {
        return this.sections[0] || "";
    }

    public get exists(): boolean {
        // TODO: page exists.
        return false;
    }

    public get isFolder(): boolean {
        // TODO: page is list
        return false;
    }
}