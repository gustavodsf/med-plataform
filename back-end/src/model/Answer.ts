
import { Collection } from 'fireorm';

@Collection()
class Answer {
  id: string;
  user_id: string;
  course_id: string;
  topic_id: string;
  question_id: string;
  user_answer: number;
  question_answer: number;
  date: Date;
}

export { Answer }