class Util {
    public endsWith(a: string, b: string): boolean {
        if (!a || !b) return false;
        return a.lastIndexOf(b) === a.length - b.length;
    }

    public readFromObject(data: any, path: string = ""): any {
        if (data) {
            if (path) {
                return path.split(".")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s)
                    .reduce((d: any, p: string) => {
                        if (d && d[p] !== undefined) return d[p];
                        else return null;
                    }, data);

            } else return data;
        } else return null;
    }
}
export const util: Util = new Util();