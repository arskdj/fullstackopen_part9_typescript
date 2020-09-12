export interface CoursePart {
    name: string;
    exerciseCount: number;
}

export interface ContentProps {
    courseParts: CoursePart[];
}

export interface HeaderProps {
    name: string;
}

export interface TotalProps {
    courseParts: CoursePart[];
}