import express from 'express'
import service from '../services/diagnoseService'

const router = express.Router();

router.get('/', (_req, res) => {
    const data = service.getAll()
    res.send(data)
})

export default router
