import patients from '../data/patients.json';
import { Gender, Patient, PatientNonSensitive, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const toNewPatient = (object: any): Patient => {

    const isString = (text: any): text is string => {
        return typeof text === 'string' || text instanceof String;
    }

    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };

    const parseName = (name: any): string => {
        if (!name || !isString(name)) {
            throw new Error('Incorrect or missing name: ' + name);
        }
        return name;
    }

    const parseSsn = (ssn: any): string => {
        if (!ssn || !isString(ssn)) {
            throw new Error('Incorrect or missing ssn: ' + ssn);
        }
        return ssn;
    }

    const parseDate = (date: any): string => {
        if (!date || !isString(date) || !isDate(date)) {
            throw new Error('Incorrect or missing dateOfBirth: ' + date);
        }
        return date;
    };

    const parseOccupation = (occupation: any): string => {
        if (!occupation || !isString(occupation)) {
            throw new Error('Incorrect or missing occupation: ' + occupation);
        }
        return occupation;
    }

    const isGender = (param: any): param is Gender => {
        return Object.values(Gender).includes(param);
    };

    const parseGender = (gender: any): Gender => {
        if (!gender || !isGender(gender)) {
            throw new Error('Incorrect or missing gender: ' + gender);
        }
        return gender;
    };

    return {
        name : parseName(object.name),
        ssn : parseSsn(object.ssn),
        dateOfBirth : parseDate(object.dateOfBirth),
        gender : parseGender(object.gender),
        id : uuid(),
        occupation : parseOccupation(object.occupation)
    }
}

const getAll = ():Patient[] => patients;

const add = (entry:PatientEntry):Patient => {
    const patient = toNewPatient(entry);
    patients.push(patient)
    return patient;
}

const getNonSensitive = (): PatientNonSensitive[] => {
    return patients.map( ({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });

};

export default {
    add,
    getAll,
    getNonSensitive
};
