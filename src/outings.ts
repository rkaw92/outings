import Dexie from "dexie";

interface Outing {
    id?: number;
    start: Date;
    end?: Date;
    location: string;
}

class Outings {
    table: Dexie.Table<Outing, Outing["id"]>;
    constructor(table: Dexie.Table<Outing, Outing["id"]>) {
        this.table = table;
    }

    async getLast(): Promise<Outing | null> {
        const lastEntry = await this.table.toCollection().last() || null;
        return lastEntry;
    }

    async add(entry: Outing) {
        return this.table.add(entry);
    }

    async update(entry: Outing) {
        await this.table.put(entry);
    }
}

export {
    Outing,
    Outings
};
