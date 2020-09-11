import express from 'express';
import cors from 'cors'
import diagRouter from './routes/diagnoses'
import patientsRouter from './routes/patients'

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/diagnoses', diagRouter)
app.use('/api/patients', patientsRouter)


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
