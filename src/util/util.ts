class Util {
    public endsWith(a: string, b: string): boolean {
        if (!a || !b) return false;
        return a.lastIndexOf(b) === a.length - b.length;
    }
}
export const util: Util = new Util();