import express from 'express';
import service from '../services/patientService';
import {PatientNonSensitive, Patient} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data:PatientNonSensitive[] = service.getNonSensitive();
    res.send(data);
});

router.post('/', (req, res) => {
    const newPatient:Patient = service.add(req.body);
    res.send(newPatient);
});

export default router;
