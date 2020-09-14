import { Patient, Discharge, Entry, BaseEntry, Gender, Type, HealthCheckRating, SickLeave, Diagnosis } from './types';

const assertNever = (value: any): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(Number(param));
};

const parseString = (value: any, name: string): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing ' + name + ':' + value);
    }
    return value;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing date ' + date);
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (isNaN(rating) || !isHealthCheckRating(rating)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing rating: ' + rating);
    }
    return rating;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
    if (!sickLeave) return undefined;

    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        startDate: parseDate(sickLeave.startDate),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        endDate: parseDate(sickLeave.endDate),
    };

};

const parseDischarge = (discharge: any): Discharge => {

    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        date: parseDate(discharge.date),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        criteria: parseString(discharge.criteria, 'criteria'),
    };

};

const parseDiagnosisCodes = (obj: any[]): Diagnosis['code'][] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!obj) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return obj.map((code: Diagnosis['code']) => 
            parseString(code, 'code')
    );
};

const parseEntry = (obj: any): Entry|undefined => {
    const baseEntry: BaseEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        id: parseString(obj.id,'id'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        description: parseString(obj.description, 'description'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        date: parseDate(obj.date),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        specialist: parseString(obj.specialist, 'specialist'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (obj.type) {
        case Type.HealthCheck:
            return {
                ...baseEntry,
                type: Type.HealthCheck,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
            };
        case Type.OccupationalHealthcare:
            return {
                ...baseEntry,
                type: Type.OccupationalHealthcare,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                employerName: parseString(obj.employerName, 'employerName'),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                sickLeave: parseSickLeave(obj.sickLeave)
            };
        case Type.Hospital:
            return {
                ...baseEntry,
                type: Type.Hospital,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                discharge: parseDischarge(obj.discharge)
            };
        default:
            assertNever(obj);
    }

    return undefined;

};

const parseEntries = (entries: any[]): Entry[] => {
    if (!entries || entries.length===0) return [];

    return entries.map((e: Entry) => parseEntry(e));
};

const parsePatient = (obj:any): Patient => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        id: parseString(obj.id, 'id'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        name: parseString(obj.name, 'name'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ssn: parseString(obj.ssn, 'ssn'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        occupation: parseString(obj.occupation, 'occupation'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dateOfBirth: parseDate(obj.dateOfBirth),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        gender: parseGender(obj.gender),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: parseEntries(obj.entries)
    };
};

export {
    assertNever,
    parseString,
    parseDate,
    parseGender,
    parseEntry,
    parsePatient,
};