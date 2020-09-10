import express from 'express';
import calculateBmi from './bmiCalculator'
const app = express();

app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send('hello');
});

app.get('/bmi', (req, res) => {
    const params = {
        height: Number(req.query.height),
        weight: Number(req.query.weight)
    }

    let bmi = '';

    try{
        bmi = calculateBmi(params);
    }catch(error) {
        console.log(error);
        return res.send(error.message);
    }

    return res.send({
        ...params,
        bmi 
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
