import { Request, Response } from "express";

import { UserService } from '../service/UserService';

class UserController {

    async getAll(request: Request, response: Response) {
        try {
           const userService = new UserService();
           const users = await userService.getAllUser()
           return response.json(users);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível listar o usuário.");
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const id = request.params.id
            const userService = new UserService();
            const user = await userService.getUser(id)
            return response.json(user);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível localizar o usuário.");
        }
    }

    async updateUser(request: Request, response: Response) {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {id,  email, name, profile, enabled } = request.body;

        if( name.trim() == '' &&  email.trim() == '' && profile.trim() == ''){
            throw new Error("Não foi possível atualizar o usuário.");
        }

        if(!re.test(String(email).toLowerCase())){
            throw new Error("Problema no email informado.")
        }

        if(!id){
            throw new Error("O id não pode ser vazio.");
        }

        try {
            const userService = new UserService();
            const user = userService.updateUser(id, email, name, profile, enabled);
            return response.json(user);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível atualizar o usuário.");
        }
    }

    async addUser(request: Request, response: Response) {
        const userService = new UserService();
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email, name, profile, enabled } = request.body;

        if( name.trim() == '' &&  email.trim() == '' && profile.trim() == ''){
            throw new Error("Os parâmetros do usuário não podem ser vazio.");
        }

        if(!re.test(String(email).toLowerCase())){
            throw new Error("Problema no email informado.")
        }

        const registered = await userService.getUser(email) 
        if(registered){
            throw new Error("Usuário já cadastrado.")
        }

        try {
            const userService = new UserService();
            const user = await userService.addNewUser(email, name, profile, enabled);
            return response.json(user);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível adicionar novo usuário");
        }
    }

    async deleteUser(request: Request, response: Response) {
        try {
            const id = request.params.id
            const userService = new UserService();
            const user = await userService.deleteUser(id)
            return response.json(user);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível excluir o usuário.");
        }
    }
}

export { UserController };
