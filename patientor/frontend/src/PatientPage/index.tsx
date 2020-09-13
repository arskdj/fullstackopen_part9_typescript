import React from 'react';
import { PatientPageProps } from '../types';
import Entry from '../components/Entry';

const PatientPage: React.FC<PatientPageProps> = (props) => {
    const patient = props.patient;

    console.log(patient);

    if (!patient)
        return (<p>patient not found</p>);
    else
        return (<>
            <h1>{patient.name} </h1>
            <p> ssn: {patient.ssn} </p>
            <p> occupation: {patient.occupation} </p>
            <h2>entries</h2>
            { patient.entries.map( e => <Entry key={e.id} entry={e} />) }
        </>);
};

export default PatientPage;