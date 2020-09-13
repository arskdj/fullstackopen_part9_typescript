import diagnoses from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const getAll = ():Diagnosis[] => diagnoses;

export default {
    getAll
};