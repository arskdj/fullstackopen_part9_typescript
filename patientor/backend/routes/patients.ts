import express from 'express'
import patients from '../data/patients.json'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patients)
})

export default router
