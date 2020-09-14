import express from 'express';
import service from '../services/patientService';
import { PublicPatient, Patient, Entry } from '../types';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
    const entry: Entry | undefined = service.addEntry(req.params.id, req.body);
    if (entry) {
        console.log('post entry', entry);
        res.send(entry);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res) => {
    const newPatient: Patient = service.add(req.body);
    res.send(newPatient);
});

router.get('/:id', (req, res) => {
    const patient: Patient | undefined = service.getById(req.params.id);
    if (patient)
        res.send(patient);
    else
        res.status(404).end();
});

router.get('/', (_req, res) => {
    const data: PublicPatient[] = service.getAll();
    res.send(data);
});

export default router;
