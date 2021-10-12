import { Collection } from 'fireorm';

@Collection()
class Question {
    id: string;
    proof: string;
    question: string;
    utterance: string
    options: Array<string>;
    answer: number;
    justification: string;
    theme: Array<string>;
    course_id: string;
    topic_id: string;
    simulated: boolean
}

export { Question }