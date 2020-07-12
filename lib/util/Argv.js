"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argv = void 0;
class Argv {
    constructor(argv) {
        this._argv = argv;
        this._params = {};
        this.parse();
    }
    has(cmd) {
        return this._params[cmd] !== undefined;
    }
    getParam(cmd) {
        return this._params[cmd];
    }
    parse() {
        let curCmd = "", curParam = [];
        this._argv.forEach((str, i) => {
            const cmd = this.createCmd(str);
            if (cmd) {
                if (curCmd)
                    this._params[curCmd] = this.createParam(curParam);
                curCmd = cmd;
                curParam = [];
            }
            else
                curParam.push(this.createValue(str));
        });
        if (curCmd)
            this._params[curCmd] = this.createParam(curParam);
    }
    createCmd(str = "") {
        if (str.indexOf("--") === 0)
            return str.substring(2);
        else if (str.indexOf("-") === 0)
            return str.substring(1);
        else
            return "";
    }
    createParam(param) {
        const len = param.length;
        if (len === 1)
            return param[0];
        else if (len > 1)
            return param;
        else
            return true; // to indicate this cmd is set.
    }
    createValue(val = "") {
        if (!isNaN(Number(val)))
            return Number(val);
        else if (val.toLowerCase() === "true")
            return true;
        else if (val.toLowerCase() === "false")
            return false;
        else
            return val;
    }
}
exports.Argv = Argv;
//# sourceMappingURL=Argv.js.map