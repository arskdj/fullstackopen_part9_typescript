import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import OccupationalHealthcareEntryForm, { OccupationalHealthcareValues } from './OccupationalHealthcareEntryForm';



interface OccupationalHealthcareProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: OccupationalHealthcareValues) => void;
    error?: string;
}

const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalHealthcareProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Occupational Healthcare entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);


export default AddOccupationalHealthcareEntryModal;