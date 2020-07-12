import fs = require("fs");
class FileUtil {
    public exists(path: string): boolean {
        try {
            const isFile:boolean = fs.lstatSync(path).isFile();
            return isFile;
        } catch (err) {
            return false;
        }
    }

}
export const fileUtil: FileUtil = new FileUtil();