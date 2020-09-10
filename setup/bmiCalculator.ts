interface Input {
    height: number,
    weight:number
}


function calculateBmi ({height, weight}:Input) :string {
    let bmi = 0.0
    if (height === 0){
        throw new Error('height can not be zero');
    }
    else {
        bmi =  weight/(height/100)**2;
    }

    console.log(bmi);

    if (bmi < 15)                   return "Very severely underweight";
    if (bmi >= 15 && bmi < 16)      return "Severely underweight";
    if (bmi >= 16 && bmi < 18.5)    return "Underweight"; 
    if (bmi >= 18.5 && bmi < 25)    return "Normal (healthy weight)";
    if (bmi >= 25 && bmi < 30)      return "Overweight";
    if (bmi >= 30 && bmi < 35)      return "Obese Class I (Moderately obese)";
    if (bmi >= 35 && bmi < 40)      return "Obese Class II (Severely obese)";
    if (bmi >= 40)                  return "Obese Class III (Very severely obese)";

}

function parseArgs():Input {
    const args = process.argv;
    console.log(args)

    if (args.length < 4) throw new Error('not enough args');

    const height = Number(args[2]);
    if (isNaN(height)) throw new Error('height not a number');

    const weight = Number(args[3]);
    if (isNaN(weight)) throw new Error('weight not a number');

        return {
            height,
            weight
        }
}

function run() {
    const input = parseArgs()
    console.log(calculateBmi(input))
}

run()
