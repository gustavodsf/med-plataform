import { Request, Response } from "express";
import { CourseService } from '@service/CourseService';

class CourseController {

    async getAll(request: Request, response: Response) {
        try {
           const courseService = new CourseService();
           const courses = await courseService.getAllCourse();
           return response.json(courses);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível listar os cursos.");
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const id = request.params.id
            const courseService = new CourseService();
            const course = await courseService.getCourse(id)
            return response.json(course);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível localizar o curso.");
        }
    }

    async deleteCourse(request: Request, response: Response) {
        try {
            const id = request.params.id
            const courseService = new CourseService();
            const course = await courseService.deleteCourse(id)
            return response.json(course);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível excluir o curso.");
        }
    }

    async addCourse(request: Request, response: Response) {

        const { name, topics, enabled  } = request.body;
        const courseService = new CourseService();

        if( name.trim() == '' &&  topics.length <= 0){
            throw new Error("Erro no parâmetro enviados do curso.");
        }

        const registered = await courseService.findByName(name)
        if(registered.length > 0) {
            throw new Error("Curso já cadastrado!");
        }
            
        try {
            const course = await courseService.addNewCourse(name, enabled, topics)
            response.json(course);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível adicionar o curso.");
        }
    }

    async updateCourse(request: Request, response: Response) {
        const {id,  name, topics, enabled } = request.body;
        
        if( name.trim() == '' &&  topics.length <= 0){
            throw new Error("Erro no parâmetro enviados do curso.");
        }

        if(!id){
            throw new Error("O id não pode ser vazio");
        }

         try {
            const courseService = new CourseService();
            const course = await courseService.updateCourse(id, name, enabled, topics)
            response.json(course);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível alterar o curso.");
        }
    }
}

export { CourseController };
