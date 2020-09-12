import React from "react";
import { ContentProps } from '../types'
import Part from '../components/Part'

const Content: React.FC<ContentProps> = ({ courseParts }) => {

    

    return (<>
    {courseParts.map( part => 
        (<Part key={part.name} part={part}/>) 
    )}
        
    </>)

}


export default Content