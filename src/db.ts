import Dexie from 'dexie';
import { Outing } from './outings';

class OutTrackerDB extends Dexie {
    outings: Dexie.Table<Outing, Outing["id"]>;
    
    constructor() {
        super('OutTrackerDB');
        this.version(1).stores({
            outings: '++id'
        });
        this.outings = this.table('outings');
    }
}

export default OutTrackerDB;
