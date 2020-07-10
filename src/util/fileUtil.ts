import fs = require("fs");
class FileUtil {
    public exists(path: string): boolean {
        try {
            fs.accessSync(path, fs.constants.R_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

}
export const fileUtil: FileUtil = new FileUtil();