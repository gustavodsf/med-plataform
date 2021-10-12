import { api } from '@service/api';

interface IUser {
    id: string;
    email: string;
    name: string;
    profile: string;
    enabled: boolean;
    courses_id: string[]
}

class UserService {

  async getAllData() : Promise<Array<IUser>> {
    const { data } =  await api.get('/user');
    return data;
  }

  async getUserById(id: string): Promise<IUser> {
    const { data } =  await api.get(`/user/${id}`);
    return data;
  }

  async save(data: { id: string; email: string; name: string; profile: string; enabled: boolean; password?: string | undefined; }): Promise<IUser> {
    return await api.post('/user', data);
  }

  async update(data: { id: string; email: string; name: string; profile: string; enabled: boolean; password?: string | undefined; }): Promise<IUser> {
    return await api.put('/user', data);
  }

  async delete(id: string) {
    const { data } =  await api.delete(`/user/${id}`);
    return data;
  }
    
}

export { UserService }
