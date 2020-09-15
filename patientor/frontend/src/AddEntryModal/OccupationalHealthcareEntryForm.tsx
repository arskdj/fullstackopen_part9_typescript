import React from 'react';
import { Formik, Field, Form } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry, Type } from '../types';
import { Grid, Button } from 'semantic-ui-react';

export type OccupationalHealthcareValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
    onSubmit: (values: OccupationalHealthcareValues) => void;
    onCancel: () => void;
}

const OccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: Type.OccupationalHealthcare,
                date: "",
                specialist: "",
                description: "",
                diagnosisCodes: [],
                employerName: "",
                sickLeave : {
                    startDate: "",
                    endDate: "",
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

                if (!values.employerName) errors.employerName = requiredError;
                if (values?.sickLeave) {
                    if (!values.sickLeave.endDate || !values.sickLeave.startDate)
                        errors.sickLeave = requiredError;
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
                            label="EmployerName"
                            placeholder="EmployerName"
                            name="employerName"
                            component={TextField}
                        />

                        <Field
                            label="SickLeaveStart"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                        />

                        <Field
                            label="SickLeaveEnd"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
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
        </Formik >
    );
};

export default OccupationalHealthcareEntryForm;