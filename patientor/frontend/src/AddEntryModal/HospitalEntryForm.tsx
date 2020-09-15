import React from 'react';
import { Formik, Field, Form } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import { Type } from '../types';

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: Type.Hospital,
                date: "",
                specialist: "",
                description: "",
                diagnosisCodes: [],
                discharge: {
                    criteria: "",
                    date: ""
                }
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

                if (values?.discharge) {
                    if (!values.discharge.criteria || !values.discharge.date)
                        errors.discharge = requiredError;
                }

                return errors;
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
                            label="DischargeCriteria"
                            placeholder="Discharge Criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />

                        <Field
                            label="DischargeDate"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
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