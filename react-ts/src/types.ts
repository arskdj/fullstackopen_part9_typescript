export interface ContentProps {
    courseParts: CoursePart[];
}

export interface HeaderProps {
    name: string;
}

export interface TotalProps {
    courseParts: CoursePart[];
}

export interface PartProps {
    part: CoursePart;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description: string;
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
    name: "4th part";
    code: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;