import React from 'react';
import {EntryPropTypes} from '../types';
import { useStateValue } from '../state';

const Entry: React.FC<EntryPropTypes> = (props) => {
    const entry = props.entry;

    const [{ diagnoses },] = useStateValue();

    
    function getDiagnoseName(code: string): string {
        if (code){
            return diagnoses[code]?.name;
        }
        return '';
    }

    if (!entry) return null;

    return (
        <>
        <p> {entry.description} </p>
        { 
            entry?.diagnosisCodes 
            && entry.diagnosisCodes.map( code => <li key={code}> {code} {getDiagnoseName(code)} </li>)
        }
        </>
    );
};

export default Entry;