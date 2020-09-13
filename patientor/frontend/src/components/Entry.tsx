import React from 'react';
import {EntryPropTypes} from '../types';

const Entry: React.FC<EntryPropTypes> = (props) => {
    const entry = props.entry;

    if (!entry) return null;

    return (
        <>
        <p> {entry.description} </p>
        { 
            entry?.diagnosisCodes 
            && entry.diagnosisCodes.map( code => <li key={code}> {code} </li>)
        }
        </>
    );
};

export default Entry;