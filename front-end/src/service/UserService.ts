import { api } from './api';

interface IUser {
    id: string;
    email: string;
    name: string;
    profile: string;
    enabled: boolean;
}

class UserService {

  async getAllData() : Promise<Array<IUser>> {
    const { data } =  await api.get('/user');
    return data;
  }

  async getUserById(id: string) {
    const { data } =  await api.get(`/user/${id}`);
    return data;
  }

  async save(data: { id: string; email: string; name: string; profile: string; enabled: boolean; password?: string | undefined; }) {
    return await api.post('/user', data);
  }

  async update(data: { id: string; email: string; name: string; profile: string; enabled: boolean; password?: string | undefined; }) {
    return await api.put('/user', data);
  }

  async delete(id: string) {
    const { data } =  await api.delete(`/user/${id}`);
    return data;
  }
    
}

export { UserService }
