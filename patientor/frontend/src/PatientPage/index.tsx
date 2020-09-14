import React from 'react';
import { Gender, PatientPageProps } from '../types';
import EntryDetails from '../components/EntryDetails';
import { Icon, Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, addEntry } from '../state';
import { Entry } from '../types';

const PatientPage: React.FC<PatientPageProps> = (props) => {
    const patient = props.patient;
    console.log(patient);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [, dispatch] = useStateValue();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        const { data: entry } = await axios
            .post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
        dispatch(addEntry(patient.id, entry));
        closeModal();
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
        { patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}

        <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
    </>);
};

export default PatientPage;