import { api } from '@service/api';

interface IAnswer {
  id?: string;
  user_id: string | undefined;
  course_id: string | undefined;
  topic_id: string | undefined;
  question_id: string | undefined;
  user_answer: number;
  question_answer: number | undefined;
}

class AnswerService {

  async save(data: IAnswer) {
    return await api.post('/answer', data);
  }

  async getAnwserByUserAndTopic(user_id: string, topic_id: string) : Promise<Array<IAnswer>> {
    const { data } = await api.get(`/answer/${user_id}/${topic_id}`);
    return data;
  }

}

export { AnswerService }