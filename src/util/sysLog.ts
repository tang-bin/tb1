class SysLog {
    public log(...msg: Array<any>): void {
        console.log("[SYS]", msg.join(" "));
    }
}
export const sysLog: SysLog = new SysLog();