import React, { FunctionComponent, useCallback, useState } from 'react';
import { Outing } from './outings';
import { Button } from './Button';

const OutingAdd: FunctionComponent<{ addAction: (location: string) => any }> = function OutingAdd({ addAction }) {
    const refs = {
        location: React.createRef<HTMLInputElement>()
    };

    const addOuting = useCallback(function addOuting(event: React.FormEvent) {
        event.preventDefault();
        if (!refs.location.current) {
            throw new Error('Location input not found - did someone remove it?!');
        }
        const location = refs.location.current.value;
        addAction(location);
    }, []);

    return <div>
        <h1 className="text-center text-3xl font-sans font-light m-4">Rejestracja wyjść</h1>
        <form onSubmit={addOuting}>
            <label htmlFor="input-location" className="text-xl block">Dokąd idziesz?</label>
            <input id="input-location" ref={refs.location} className="bg-gray-100 text-xl block w-full h-12 p-4 border border-gray-500" placeholder="Nazwa miejsca, sklepu" />
            <Button text="Wychodzę" />
        </form>
    </div>;
};

const OutingFinish: FunctionComponent<{ currentOuting: Outing, finishAction: () => any }> = function OutingFinish({ currentOuting, finishAction }) {
    const finishOuting = useCallback(function finishOuting(event: React.FormEvent) {
        event.preventDefault();
        finishAction();
    }, []);
    const formatter = new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    return <>
        <div>
            <h1 className="text-center text-3xl font-sans font-light m-4">Rejestracja wyjść</h1>
                <p className="text-xl block">Aktualnie jesteś w: <span>{currentOuting.location}</span><br/>(od <span>{formatter.format(currentOuting.start)}</span>)</p>
            <form onSubmit={finishOuting}>
                <Button text="Wracam" />
            </form>
        </div>
    </>;
};

export { OutingAdd, OutingFinish };
