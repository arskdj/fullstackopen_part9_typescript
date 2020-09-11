import express from 'express';
import service from '../services/patientService';
import {PatientNonSensitive} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data:PatientNonSensitive[] = service.getNonSensitive();
    res.send(data);
});

router.post('/', (req, res) => {
    const newPatient = req.body; 
    console.log(newPatient)
    service.add(newPatient);
    res.send(newPatient);
});


export default router;
