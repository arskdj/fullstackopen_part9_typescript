import React from 'react';
import { Gender, PatientPageProps } from '../types';
import EntryDetails from '../components/EntryDetails';
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC<PatientPageProps> = (props) => {
    const patient = props.patient;

    console.log(patient);


    if (!patient) return (<p>patient not found</p>);
    
    function getIcon(){

     if (patient.gender === Gender.Male) 
        return <Icon color="blue" name="male" />;
     if (patient.gender === Gender.Female) 
        return <Icon color="pink" name="female" />;
    return <Icon color="violet" name="transgender alternate" />;

    }

        return (<>
            <h1>{patient.name} {getIcon()} 
            </h1>
            <p> ssn: {patient.ssn} </p>
            <p> occupation: {patient.occupation} </p>
            <h2>entries</h2>
            { patient.entries.map( e => <EntryDetails key={e.id} entry={e} />) }
        </>);
};

export default PatientPage;