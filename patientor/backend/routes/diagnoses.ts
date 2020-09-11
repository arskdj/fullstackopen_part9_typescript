import express from 'express';
import service from '../services/diagnoseService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data:Diagnose[] = service.getAll();
    res.send(data);
});

export default router;
