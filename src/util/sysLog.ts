class SysLog {
    public log(...msg: Array<any>): void {
        console.debug("[SYS]", msg.join(" "));
    }
}
export const sysLog: SysLog = new SysLog();