import { api } from '@service/api';

interface ITopic {
  id: string;
  name: string;
  pdf_url: string;
  couseId?: string;
}

class TopicService {
  async getAllData(): Promise<Array<ITopic>> {
    const { data } = await api.get<Array<ITopic>>('/topic');
    return data;
  }

  async getTopicById(id: string): Promise<ITopic> {
    const { data } = await api.get<ITopic>(`/topic/${id}`);
    return data;
  }
}

export { TopicService };
