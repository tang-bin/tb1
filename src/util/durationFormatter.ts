class DurationFormatter {
    format(time: number, unit: string): string {
        if (time === null || time === undefined) return "";
        else if (time === 0) return "0";
        else if (time < 0) return "";
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
                if (time < 1000) return time + "ms";
                else time = time / 1000;
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
        if (strs.length >= 2) return strs[0] + " " + strs[1];
        else if (strs.length === 1) return strs[0];
        else return "";

    }
}
export const durationFormatter: DurationFormatter = new DurationFormatter();