class Data {
    constructor() {
        // TODO: load data from content/db.json
    }

    public isPage(path: string): boolean {
        return false;
    }
}

export const data: Data = new Data();