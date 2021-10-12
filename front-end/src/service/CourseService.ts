import { api } from '@service/api';

interface ITopic {
  id: string;
  name: string;
  pdf_url: string;
  couseId?: string;
}

interface ICourse {
  id: string;
  name: string;
  enabled: boolean;
  topics: Array<ITopic>;
}

class CourseService {

  async save(data: ICourse) {
    return await api.post('/course', data);
  }

  async update(data: ICourse) {
    return await api.put('/course', data);
  }
    
  async getAllData() : Promise<Array<ICourse>> {
    const { data } =  await api.get('/course');
    return data;
  } 

  async delete(id: string) {
    const { data } =  await api.delete(`/course/${id}`);
    return data;
  }  
}

export { CourseService }
