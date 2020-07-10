class TimeFormatter {
    static SHORT_FORMAT: string = "MM/DD/yyyy hh:mm:ss";
    static DEFAULT_FORMAT: string = "Mon DD yyyy, hh:mm:ss AM/PM";
    static MONTH_LONG: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    static MONTH_SHORT: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    /**
     * 
     * @param time 
     * @param formatString 
     */
    format(time: number, formatString: string) {
        let date;
        if (time === 0) date = new Date();
        else if (isNaN(Number(time))) {
            if (isNaN(new Date(time).getTime())) return '';
            else return String(time);
        }
        else {
            time = Number(time);
            if (!time || time <= 0) return '';
            else date = new Date(time);
        }
        //
        if (formatString === "short") formatString = TimeFormatter.SHORT_FORMAT;
        else if (!formatString) formatString = TimeFormatter.DEFAULT_FORMAT;
        //
        let str: string = formatString;
        //
        if (str.indexOf("yyyy") >= 0) {
            str = str.replace("yyyy", String(date.getFullYear()));
        }
        if (str.indexOf("Month") >= 0) {

            str = str.replace("Month", TimeFormatter.MONTH_LONG[date.getMonth()]);
        }
        if (str.indexOf("Mon") >= 0) {
            str = str.replace("Mon", TimeFormatter.MONTH_SHORT[date.getMonth()]);
        }
        if (str.indexOf("MM") >= 0) {
            const mm: number = date.getMonth() + 1;
            str = str.replace("MM", mm < 10 ? "0" + mm : String(mm));
        }
        if (str.indexOf("ddd") >= 0) {
            let ddd: number = date.getDate(), pfix = "";
            if (ddd === 1 || ddd === 21 || ddd === 31) pfix = "st";
            else if (ddd === 2 || ddd === 22) pfix = "nd";
            else if (ddd === 3 || ddd === 23) pfix = "rd";
            else pfix = "th";
            str = str.replace("ddd", String(ddd + pfix));
        }
        if (str.indexOf("DD") >= 0) {
            const DD: Number = date.getDate();
            str = str.replace("DD", DD < 10 ? "0" + DD : String(DD));
        }
        if (str.indexOf("hh") >= 0) {
            let hh = date.getHours();
            if (str.indexOf("AM/PM") >= 0) {
                if (hh >= 12) {
                    str = str.replace("AM/PM", "PM");
                    if (hh > 12) hh -= 12;
                }
                else {
                    str = str.replace("AM/PM", "AM");
                }
            }
            str = str.replace("hh", hh < 10 ? "0" + hh : String(hh));
        }
        if (str.indexOf("mm") >= 0) {
            const mm: number = date.getMinutes();
            str = str.replace("mm", String(mm < 10 ? "0" + mm : mm));
        }
        if (str.indexOf("ss") >= 0) {
            const ss: number = date.getSeconds();
            str = str.replace("ss", String(ss < 10 ? "0" + ss : ss));
        }
        return str;
    };
}

export const timeFormatter = new TimeFormatter();