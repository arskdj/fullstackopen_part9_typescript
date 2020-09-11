import patients from '../data/patients.json';
import { Patient, PatientNonSensitive, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = ():Patient[] => patients;

const add = (entry:PatientEntry):void => {
    const patient = { ...entry, id : uuid() };
    patients.push(patient)
}

const getNonSensitive = (): PatientNonSensitive[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
    
};

export default {
    add,
    getAll,
    getNonSensitive
};
