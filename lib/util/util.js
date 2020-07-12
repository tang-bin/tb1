"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
class Util {
    endsWith(a, b) {
        if (!a || !b)
            return false;
        return a.lastIndexOf(b) === a.length - b.length;
    }
    readFromObject(data, path = "") {
        if (data) {
            if (path) {
                return path.split(".")
                    .map((s) => s.trim())
                    .filter((s) => s)
                    .reduce((d, p) => {
                    if (d && d[p] !== undefined)
                        return d[p];
                    else
                        return null;
                }, data);
            }
            else
                return data;
        }
        else
            return null;
    }
}
exports.util = new Util();
//# sourceMappingURL=util.js.map