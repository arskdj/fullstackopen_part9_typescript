import express from 'express';
import service from '../services/patientService';
import {PatientNonSensitive} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data:PatientNonSensitive[] = service.getNonSensitive();
    res.send(data);
});

export default router;
