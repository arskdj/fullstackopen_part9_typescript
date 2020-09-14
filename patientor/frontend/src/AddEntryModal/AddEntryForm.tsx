import React from 'react';
import { Formik, Field, Form } from 'formik';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import SelectTypeField, { typeOptions } from './SelectTypeField';
import { Type, HealthCheckRating } from '../types';

export type EntryFormValues =
    Omit<HealthCheckEntry, 'id'>
    | Omit<HospitalEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>
    ;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: Type.HealthCheck,
                date: "",
                specialist: "",
                description: "",
                diagnosisCodes: [],
                healthCheckRating: HealthCheckRating.Healthy,
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};

                if (!values.date) errors.date = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                if (!values.description) errors.description = requiredError;
                if (!values.type) errors.type = requiredError;

                if (values.diagnosisCodes) {
                    values.diagnosisCodes.forEach(code => {
                        if (!code) errors.diagnosisCodes = requiredError;
                    });
                }

                switch (values.type) {
                    case Type.HealthCheck: {
                        if (!values.healthCheckRating) errors.healthCheckRating = requiredError;
                        break;
                    }
                    case Type.OccupationalHealthcare: {
                        if (!values.employerName) errors.employerName = requiredError;
                        if (values?.sickLeave) {
                            if (!values.sickLeave.endDate || !values.sickLeave.startDate)
                                errors.sickLeave = requiredError;
                        }
                        break;
                    }
                    case Type.Hospital: {
                        if (values?.discharge) {
                            if (!values.discharge.criteria || !values.discharge.date)
                                errors.discharge = requiredError;
                        }
                        break;
                    }
                    default:
                        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(values)}`);
                }
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">
                        <SelectTypeField
                            label="Type"
                            name="type"
                            options={typeOptions}
                        />

                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />

                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />

                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                            </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                            </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;