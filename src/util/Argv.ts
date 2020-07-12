export class Argv {
    private _argv: Array<string>;
    private _params: { [id: string]: any };

    constructor(argv: Array<string>) {
        this._argv = argv;
        this._params = {};
        this.parse();
    }

    public has(cmd: string): boolean {
        return this._params[cmd] !== undefined;
    }

    public getParam(cmd: string): any {
        return this._params[cmd];
    }

    private parse(): void {
        let curCmd: string = "", curParam: Array<string> = [];
        this._argv.forEach((str: string, i: number) => {
            const cmd = this.createCmd(str);
            if (cmd) {
                if (curCmd) this._params[curCmd] = this.createParam(curParam);
                curCmd = cmd;
                curParam = [];
            } else curParam.push(this.createValue(str));
        });
        if (curCmd) this._params[curCmd] = this.createParam(curParam);
    }

    private createCmd(str: string = ""): string {
        if (str.indexOf("--") === 0) return str.substring(2);
        else if (str.indexOf("-") === 0) return str.substring(1);
        else return "";
    }

    private createParam(param: Array<string>): any {
        const len: number = param.length;
        if (len === 1) return param[0];
        else if (len > 1) return param;
        else return true; // to indicate this cmd is set.
    }

    private createValue(val: string = ""): any {
        if (!isNaN(Number(val))) return Number(val);
        else if (val.toLowerCase() === "true") return true;
        else if (val.toLowerCase() === "false") return false;
        else return val;
    }
}