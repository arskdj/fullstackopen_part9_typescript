import React from 'react';
import { EntryPropTypes, Entry } from '../types';
import { useStateValue } from '../state';
import { Icon, Segment } from 'semantic-ui-react';

const EntryDetails: React.FC<EntryPropTypes> = (props) => {
    const entry = props.entry;

    const [{ diagnoses },] = useStateValue();

    const assertNever = (value: any): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    function getDiagnoseName(code: string): string {
        if (code) {
            return diagnoses[code]?.name;
        }
        return '';
    }

    if (!entry) return null;

    function getIcon(entry: Entry) {
        switch (entry.type) {
            case 'HealthCheck':
                return (<Icon size="big" color="green" name="doctor" />);
            case 'OccupationalHealthcare':
                return (<Icon size="big" color="blue" name="desktop" />);
            case 'Hospital':
                return (<Icon size="big" color="red" name="plus square outline" />);
            default:
                assertNever(entry);
        }
        return (<Icon name="dot circle" />);
    }

    return (
        <Segment>
            <p> {getIcon(entry)} {entry.description} </p>
            {
                entry?.diagnosisCodes
                && entry.diagnosisCodes.map(code => <li key={code}> {code} {getDiagnoseName(code)}</li>)
            }
        </Segment>
    );
};

export default EntryDetails;