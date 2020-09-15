import React from 'react';
import { Gender, PatientPageProps } from '../types';
import EntryDetails from '../components/EntryDetails';
import { Icon, Button } from 'semantic-ui-react';

import HealthCheckEntryModal from '../AddEntryModal/HealthCheckEntryModal';
import OccupationalHealthcareEntryModal from '../AddEntryModal/OccupationalHealthcareEntryModal';
import HospitalEntryModal from '../AddEntryModal/HospitalEntryModal copy';

import { HospitalEntryFormValues } from '../AddEntryModal/HospitalEntryForm';
import { HealthCheckEntryFormValues } from '../AddEntryModal/HealthCheckEntryForm';
import { OccupationalHealthcareValues } from '../AddEntryModal/OccupationalHealthcareEntryForm';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, addEntry } from '../state';
import { Entry } from '../types';

const PatientPage: React.FC<PatientPageProps> = (props) => {
    const patient = props.patient;
    console.log(patient);

    const [HealthModalOpen, setHealthModalOpen] = React.useState<boolean>(false);
    const [OccupationalOpen, setOccupationalOpen] = React.useState<boolean>(false);
    const [HospitalOpen, setHospitalOpen] = React.useState<boolean>(false);

    const [HealthError, setHealthError] = React.useState<string | undefined>();
    const [OccupationalError, setOccupationalError] = React.useState<string | undefined>();
    const [HospitalError, setHospitalError] = React.useState<string | undefined>();

    const [, dispatch] = useStateValue();

    const openHealthCheckEntryModal = (): void => setHealthModalOpen(true);
    const closeHealthCheckEntryModal = (): void => {
        setHealthModalOpen(false);
        setHealthError(undefined);
    };

    const openOccupationalHealthcareEntryModal = (): void => setOccupationalOpen(true);
    const closeOccupationalHealthcareEntryModal = (): void => {
        setOccupationalOpen(false);
        setOccupationalError(undefined);
    };

    const openHospitalEntryModal = (): void => setHospitalOpen(true);
    const closeHospitalEntryModal = (): void => {
        setHospitalOpen(false);
        setHospitalError(undefined);
    };

    const submitNewEntry = async (
        values: HospitalEntryFormValues
            | HealthCheckEntryFormValues
            | OccupationalHealthcareValues) => {

        try {
            const { data: entry } = await axios
                .post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
            dispatch(addEntry(patient.id, entry));

            closeHealthCheckEntryModal();
            closeOccupationalHealthcareEntryModal();
            closeHospitalEntryModal();
        }
        catch (e) {
            console.error(e);
            setHospitalError(e);
            setOccupationalError(e);
            setHealthError(e);
        }
    };

    if (!patient) return (<p>patient not found</p>);

    function getIcon() {
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
        { patient?.entries?.map(e => <EntryDetails key={e.id} entry={e} />)}

        <OccupationalHealthcareEntryModal
            modalOpen={OccupationalOpen}
            onSubmit={submitNewEntry}
            error={OccupationalError}
            onClose={closeOccupationalHealthcareEntryModal}
        />

        <HealthCheckEntryModal
            modalOpen={HealthModalOpen}
            onSubmit={submitNewEntry}
            error={HealthError}
            onClose={closeHealthCheckEntryModal}
        />

        <HospitalEntryModal
            modalOpen={HospitalOpen}
            onSubmit={submitNewEntry}
            error={HospitalError}
            onClose={closeHospitalEntryModal}
        />

        <Button color="blue" onClick={() => openOccupationalHealthcareEntryModal()}>Add New OccupationalHealthcare Entry</Button>
        <Button color="green" onClick={() => openHealthCheckEntryModal()}>Add New HealthCheck Entry</Button>
        <Button color="red" onClick={() => openHospitalEntryModal()}>Add New Hospital Entry</Button>
    </>);
};

export default PatientPage;