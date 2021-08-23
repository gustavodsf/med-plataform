import { api } from './api';

class SendService {

    async sendWelcomeMessage(email:string, password: string) {
        await api.post('/send/welcome/email',{email, password});
    }

}

export { SendService }