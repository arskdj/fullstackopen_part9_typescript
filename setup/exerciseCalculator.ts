export interface Input {
    daily_exercises : number[],
    target : number
}
interface Report {
    periodLength : number,
    trainingDays : number,
    success : boolean,
    rating : number,
    ratingDescription : string,
    target : number,
    average : number
}

export default function calculateExercises (input: Input) : Report {
    const periodLength = input.daily_exercises.length;
    const trainingDays = input.daily_exercises.filter( d => d !== 0).length;
    const average = input.daily_exercises.reduce((sum, day) => sum + day, 0) / periodLength;
    const rating =   Math.round(average) < input.target ? 1
        : Math.round(average) === input.target ? 2 
        : 3;
    const ratingDescription = ['get good lmao', 'not bad', 'nice'][rating - 1];
    const success = rating >= input.target;


        return {
            periodLength,
            trainingDays,
            success,
            rating,
            ratingDescription,
            target: input.target,
            average,
        };
}

function parseArgs(args: string[]):Input {
    console.log(args);

    if (args.length < 4)
        throw new Error('not enough arguments');

    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('target argument not a number');

        const daily_exercises = [];

        for (let i=3; i < args.length; i++) {
            const num = Number(args[i]);
            if (isNaN(num)) throw new Error('day argument not a number');
                daily_exercises.push(num); 
        }

        return {
            target,
            daily_exercises
        };
}

if (!module.parent) {
    const input = parseArgs(process.argv);
    console.log(calculateExercises(input));
}
