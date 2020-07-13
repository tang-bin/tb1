import fs = require("fs");
class FileUtil {
    public exists(path: string): boolean {
        return this.isFile(path) || this.isFolder(path);
    }

    public isFile(path: string): boolean {
        try {
            const isFile: boolean = fs.lstatSync(path).isFile();
            return isFile;
        } catch (err) {
            return false;
        }
    }

    public isFolder(path: string): boolean {
        try {
            const isFile: boolean = fs.lstatSync(path).isDirectory();
            return isFile;
        } catch (err) {
            return false;
        }
    }

}
export const fileUtil: FileUtil = new FileUtil();