import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import { Type } from '../types';

type TypeOption = {
    value: Type;
    label: string;
};

export const typeOptions: TypeOption[] = [
    { value: Type.HealthCheck, label: "HealthCheck" },
    { value: Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
    { value: Type.Hospital, label: "Hospital" }
];

type SelectFieldProps = {
    name: string;
    label: string;
    options: TypeOption[];
};

 const SelectTypeField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options
}: SelectFieldProps) => (
        <Form.Field>
            <label>{label}</label>
            <Field as="select" name={name} className="ui dropdown">
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </Field>
        </Form.Field>
    );

export default SelectTypeField;