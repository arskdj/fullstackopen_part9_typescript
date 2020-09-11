import patients from '../data/patients.json';
import { Patient, PatientNonSensitive } from '../types';

const getAll = ():Patient[] => patients;

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
    getAll,
    getNonSensitive
};
