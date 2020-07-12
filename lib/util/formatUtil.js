"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUtil = void 0;
class FormatUtil {
    duration(time, unit) {
        if (time === null || time === undefined)
            return "";
        else if (time === 0)
            return "0";
        else if (time < 0)
            return "";
        //
        unit = unit || "ms";
        //
        let m = 60, h = 3600, d = 86400, strs = [];
        switch (unit) {
            case "m":
                return time + "m";
            case "h":
                return time + "h";
            case "d":
                return time + "d";
            case "ms":
                if (time < 1000)
                    return time + "ms";
                else
                    time = time / 1000;
                break;
        }
        if (time >= d) {
            strs.push(Math.floor(time / d) + "d");
            time = time % d;
        }
        if (time >= h) {
            strs.push(Math.floor(time / h) + "h");
            time = time % h;
        }
        if (time >= m) {
            strs.push(Math.floor(time / m) + "m");
            time = time % m;
        }
        if (time > 0) {
            strs.push(Math.floor(time) + "s");
        }
        //
        if (strs.length >= 2)
            return strs[0] + " " + strs[1];
        else if (strs.length === 1)
            return strs[0];
        else
            return "";
    }
    /**
     *
     * @param time
     * @param formatString
     */
    time(time = 0, formatString = "short") {
        let date;
        if (time === 0)
            date = new Date();
        else if (isNaN(Number(time))) {
            if (isNaN(new Date(time).getTime()))
                return '';
            else
                return String(time);
        }
        else {
            time = Number(time);
            if (!time || time <= 0)
                return '';
            else
                date = new Date(time);
        }
        //
        if (formatString === "short")
            formatString = FormatUtil.SHORT_TIME_FORMAT;
        else if (!formatString)
            formatString = FormatUtil.DEFAULT_TIME_FORMAT;
        //
        let str = formatString;
        //
        if (str.indexOf("yyyy") >= 0) {
            str = str.replace("yyyy", String(date.getFullYear()));
        }
        if (str.indexOf("Month") >= 0) {
            str = str.replace("Month", FormatUtil.MONTH_LONG[date.getMonth()]);
        }
        if (str.indexOf("Mon") >= 0) {
            str = str.replace("Mon", FormatUtil.MONTH_SHORT[date.getMonth()]);
        }
        if (str.indexOf("MM") >= 0) {
            const mm = date.getMonth() + 1;
            str = str.replace("MM", mm < 10 ? "0" + mm : String(mm));
        }
        if (str.indexOf("ddd") >= 0) {
            let ddd = date.getDate(), pfix = "";
            if (ddd === 1 || ddd === 21 || ddd === 31)
                pfix = "st";
            else if (ddd === 2 || ddd === 22)
                pfix = "nd";
            else if (ddd === 3 || ddd === 23)
                pfix = "rd";
            else
                pfix = "th";
            str = str.replace("ddd", String(ddd + pfix));
        }
        if (str.indexOf("DD") >= 0) {
            const DD = date.getDate();
            str = str.replace("DD", DD < 10 ? "0" + DD : String(DD));
        }
        if (str.indexOf("hh") >= 0) {
            let hh = date.getHours();
            if (str.indexOf("AM/PM") >= 0) {
                if (hh >= 12) {
                    str = str.replace("AM/PM", "PM");
                    if (hh > 12)
                        hh -= 12;
                }
                else {
                    str = str.replace("AM/PM", "AM");
                }
            }
            str = str.replace("hh", hh < 10 ? "0" + hh : String(hh));
        }
        if (str.indexOf("mm") >= 0) {
            const mm = date.getMinutes();
            str = str.replace("mm", String(mm < 10 ? "0" + mm : mm));
        }
        if (str.indexOf("ss") >= 0) {
            const ss = date.getSeconds();
            str = str.replace("ss", String(ss < 10 ? "0" + ss : ss));
        }
        return str;
    }
    ;
}
FormatUtil.SHORT_TIME_FORMAT = "MM/DD/yyyy hh:mm:ss";
FormatUtil.DEFAULT_TIME_FORMAT = "Mon DD yyyy, hh:mm:ss AM/PM";
FormatUtil.MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
FormatUtil.MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
exports.formatUtil = new FormatUtil();
//# sourceMappingURL=formatUtil.js.map