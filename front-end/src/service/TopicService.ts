import { api } from './api';

interface ITopic {
  id: string;
  name: string;
  pdf_url: string;
  couseId?: string;
}

class TopicService {

  async getAllData() : Promise<Array<ITopic>> {
    const { data } =  await api.get('/topic');
    return data;
  }  
}

export { TopicService };
