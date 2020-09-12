import React from "react";
import { PartProps } from '../types'

const Part: React.FC<PartProps> = ({ part }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (part.name) {
        case "Fundamentals":
            break;
        case "Using props to pass data":
            break;
        case "Deeper type usage":
            break;
        case "4th part":
            break;
        default:
            return assertNever(part);
    }

    return (<>
        {
            Object.entries(part).map((entry) => {
                const key = entry[0];
                const value = entry[1];
                return (<p key={part.name + '.' + value}> {key} = {value}</p>)
            })
        }
        <p>____________</p>
    </>)
}

export default Part