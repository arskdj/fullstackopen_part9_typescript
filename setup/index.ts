import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises, {Input} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req: unknown, res: { send: (arg0: string) => void; }) => {
    res.send('hello');
});

app.get('/bmi', (req, res) => {
    const params = {
        height: Number(req.query.height),
        weight: Number(req.query.weight)
    };

    let bmi = '';

    try{
        bmi = calculateBmi(params);
    }catch(error) {
        console.log(error);
        return res.status(400).json({error: "malformatted parameters"});
    }

    return res.send({
        ...params,
        bmi 
    });
});

app.post('/exercises', (req, res) => {
    console.log('req',req.body);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const input:Input = req.body;


    if (!input) res.status(400).json({error: "parameters missing"}).end();

    const {daily_exercises, target} = input;

    if (isNaN(target)) res.status(400).json({error: "malformatted parameters"}).end();

    daily_exercises.forEach( (e:number):void => {
        if (isNaN(e)) res.status(400).json({error: "malformatted parameters"}).end();
    });

    const result = calculateExercises({target, daily_exercises});

    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
