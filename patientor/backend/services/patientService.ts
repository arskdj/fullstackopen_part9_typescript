import patients from '../data/patients';
import { Patient, PublicPatient, PatientInput, Entry, } from '../types';
import { v1 as uuid } from 'uuid';
import {
    parsePatient,
    parseEntry
} from '../parse';

const toNewPatient = (obj: any): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = {
        ...obj,
        id: uuid()
    };
    
    return parsePatient(patient);
};

const toNewEntry = (obj: any): Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    obj.id = uuid();
    console.log('parsing entry', obj);
    return parseEntry(obj);
};

const getAll = ():Patient[] => patients;

const addPatient = (input:PatientInput): Patient => {
    const patient = toNewPatient(input);
    patients.push(patient);
    return patient;
};

const addEntry = (pid: string, entry: Entry): Entry|undefined => {
    const patient: Patient|undefined = getById(pid);
    const newEntry: Entry = toNewEntry(entry);
    patient?.entries.push(newEntry);
    return newEntry;
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
