
import { getRepository } from 'fireorm';

import { User } from '../model/User';

class UserService {

    async getAllUser() {
        const userRepository = getRepository(User);
        return await userRepository.orderByAscending('name').find()
    }
    
    async getUser(id: string) {
        const userRepository = getRepository(User);
        return await userRepository.findById(id);
    }

    async addNewUser(email: string, name: string, profile: string, enabled: boolean) {
        const userRepository = getRepository(User);
        let user = new User();
        user.id = email;
        user.email = email;
        user.name = name;
        user.profile = profile;
        user.enabled = enabled;
        if(profile !== 'user' && profile !== 'admin') {
            user.profile = 'user';
        }
        const userCreated = await userRepository.create(user);
        return userCreated;
    }

    async updateUser(id: string, email: string, name: string, profile: string, enabled: boolean){
        const userRepository = getRepository(User);
        let user = new User();
        user.id = id;
        user.email = email;
        user.name = name;
        user.profile = profile;
        user.enabled = enabled;
        if(profile !== 'user' && profile !== 'admin') {
            user.profile = 'user';
        }
        await userRepository.update(user);
        return user;
    }

    async deleteUser(id: string) {
        const userRepository = getRepository(User);
        await userRepository.delete(id);
        return {"message": "Usuário removido com sucesso!"}
    }

}

export { UserService };