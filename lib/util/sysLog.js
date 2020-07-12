"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sysLog = void 0;
class SysLog {
    log(...msg) {
        console.log("[SYS]", msg.join(" "));
    }
}
exports.sysLog = new SysLog();
//# sourceMappingURL=sysLog.js.map