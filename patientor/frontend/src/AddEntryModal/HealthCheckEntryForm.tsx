import React from 'react';
import { Formik, Field, Form } from 'formik';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import { Type, HealthCheckRating } from '../types';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    onCancel: () => void;
}

const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
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

                if (!values.healthCheckRating) errors.healthCheckRating = requiredError;

            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
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

export default HealthCheckEntryForm;