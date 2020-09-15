import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import HealthCheckEntryForm, { HealthCheckEntryFormValues } from './HealthCheckEntryForm';

interface HealthCheckEntryProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    error?: string;
}

const AddHealthEntryModal = ({ modalOpen, onClose, onSubmit, error }: HealthCheckEntryProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Health Check entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddHealthEntryModal;
