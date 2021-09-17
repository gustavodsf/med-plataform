import { api } from './api';

type IQuestion = {
  answer: number;
  course_id: string;
  id: string;
  justification: string;
  options: Array<string>;
  proof: string;
  question: string;
  simulated: boolean
  theme: Array<string>;
  topic_id: string;
  utterance: string
}

class QuestionService {

  async delete(id: string) {
    const { data } =  await api.delete(`/question/${id}`);
    return data;
  }
  
  async update(data: { answer: number; course_id: string; id: string; justification: string; options: string[]; proof: string; question: string; simulated: boolean; theme: string[]; topic_id: string; utterance: string; }) {
    return await api.put('/question', data);
  }

  async save(data: { answer: number; course_id: string; id: string; justification: string; options: string[]; proof: string; question: string; simulated: boolean; theme: string[]; topic_id: string; utterance: string; }) {
    return await api.post('/question', data);
  }

  async getAllData() : Promise<Array<IQuestion>> {
    const { data } =  await api.get('/question');
    return data;
  } 

  async getQuestionOfTopic(topicId: string) : Promise<Array<IQuestion>> {
    const { data } = await api.get(`/question/topic/${topicId}`)
    return data;
  }

}

export { QuestionService }