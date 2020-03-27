import React, { FunctionComponent } from 'react';

const Button: FunctionComponent<{ text: string }> = function Button({ text }) {
    return <button className="block mx-auto p-2 px-8 m-4 border border-blue-500 rounded text-2xl text-blue-500 font-medium">{text}</button>;
};

export { Button };
