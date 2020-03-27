import React, { FunctionComponent, useState } from 'react';
import ReactDOM from 'react-dom';
import db from './db';
import { Outings, Outing } from './outings';
import { OutingFinish, OutingAdd } from './views';

// Load our style so that the extractor plugin knows about it:
import './style.css';

const App: FunctionComponent<{ outings: Outings, lastOuting: Outing | null }> = function App({ outings, lastOuting }) {
    const [ currentOuting, setOuting ] = useState(lastOuting);
    async function addAction(location: string) {
        await outings.add({
            location: location,
            start: new Date()
        });
        const addedOuting = await outings.getLast()!;
        setOuting(addedOuting);
    }
    async function finishAction() {
        const updatedOuting: Outing = Object.assign({}, currentOuting!, { end: new Date() });
        await outings.update(updatedOuting);
        setOuting(null);
    }
    if (currentOuting && !currentOuting.end) {
        return <OutingFinish currentOuting={currentOuting} finishAction={finishAction} />;
    } else {
        return <OutingAdd addAction={addAction} />;
    }
};

async function createApp() {
    const database = new db();
    const outings = new Outings(database.outings);
    ReactDOM.render(<App outings={outings} lastOuting={await outings.getLast()}/>, document.getElementById('content'));
}

createApp();

if (typeof navigator.serviceWorker === 'object') {
    navigator.serviceWorker.register('sw.js');
}
