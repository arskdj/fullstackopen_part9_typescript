import express from 'express';
import service from '../services/patientService';
import {PublicPatient, Patient} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: PublicPatient[] = service.getAll();
    res.send(data);
});

router.post('/', (req, res) => {
    const newPatient:Patient = service.add(req.body);
    res.send(newPatient);
});

router.get('/:id', (req, res) => {
    const patient: Patient|undefined = service.getById(req.params.id);
    if (patient)
        res.send(patient);
    else 
        res.status(404).end();
});

export default router;
