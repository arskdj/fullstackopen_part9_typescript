interface Report {
    periodLength : number,
    trainingDays : number,
    success : boolean,
    rating : number,
    ratingDescription : string,
    target : number,
    average : number
}

function calculateExercises (input : number[], target: number) : Report {
    const periodLength = input.length;
    const trainingDays = input.filter( d => d !== 0).length;
    const average = input.reduce((sum, day) => sum + day, 0) / periodLength;
     const rating =   Math.round(average) < target ? 1
                    : Math.round(average) === target ? 2
                    : 3
    const ratingDescription = ['get good lmao', 'not bad', 'nice'][rating - 1]
    const success = rating >= target;


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
