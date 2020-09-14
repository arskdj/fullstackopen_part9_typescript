import patients from '../data/patients';
import { Gender, Patient, PublicPatient, PatientInput, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const toNewPatient = (object: any): Patient => {

    const isString = (text: any): text is string => {
        return typeof text === 'string' || text instanceof String;
    };

    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };

    const parseName = (name: any): string => {
        if (!name || !isString(name)) {
            throw new Error('Incorrect or missing name: ' + name);
        }
        return name;
    };

    const parseSsn = (ssn: any): string => {
        if (!ssn || !isString(ssn)) {
            throw new Error('Incorrect or missing ssn: ' + ssn);
        }
        return ssn;
    };

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
    };

    const isGender = (param: any): param is Gender => {
        return Object.values(Gender).includes(param);
    };

    const parseGender = (gender: any): Gender => {
        if (!gender || !isGender(gender)) {
            throw new Error('Incorrect or missing gender: ' + gender);
        }
        return gender;
    };

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const parseEntry = (entry: Entry): Entry => {
        switch (entry.type) {
            case 'HealthCheck':
            case 'OccupationalHealthcare':
            case 'Hospital':
                break;
            default:
                assertNever(entry);
        }
        return entry;
    };

    return {
        name : parseName(object.name),
        ssn : parseSsn(object.ssn),
        dateOfBirth : parseDate(object.dateOfBirth),
        gender : parseGender(object.gender),
        id : uuid(),
        occupation : parseOccupation(object.occupation),
        entries: object.entries.map( (e: Entry) => parseEntry(e))
    };
};

const getAll = ():Patient[] => patients;

const addPatient = (input:PatientInput): Patient => {
    const patient = toNewPatient(input);
    patients.push(patient);
    return patient;
};

const addEntry = (pid: string, entry: Entry): Patient|undefined => {
    const patient: Patient|undefined = getById(pid);
    patient?.entries.push(entry);
    return patient;
};

const getNonSensitive = (): PublicPatient[] => {
    return patients.map( ({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });

};

const getById = (id: string): Patient | undefined => {
    return patients.find( p => p.id === id);
};

export default {
    add: addPatient,
    getAll,
    getNonSensitive,
    getById,
    addEntry
};
