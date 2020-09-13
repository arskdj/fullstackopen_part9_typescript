import React from 'react';
import { PatientPageProps } from '../types';


const PatientPage = (props: PatientPageProps) => {
    const patient = props.patient;

    console.log(patient);

    if (!patient)
        return (<p>patient not found</p>);
    else
        return (<>
            <h1>{patient.name} </h1>
            <p> ssn: {patient.ssn} </p>
            <p> occupation: {patient.occupation} </p>
        </>);
};

export default PatientPage;