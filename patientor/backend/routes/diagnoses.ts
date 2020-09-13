import express from 'express';
import service from '../services/diagnoseService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data:Diagnosis[] = service.getAll();
    res.send(data);
});

export default router;
