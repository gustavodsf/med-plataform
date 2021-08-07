import { Request, Response } from "express";
import { CourseService } from '../service/CourseService';

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

        const { name, topics } = request.body;
        const courseService = new CourseService();

        if( name.trim() == '' &&  topics.length <= 0){
            throw new Error("Erro no parâmetro enviados do curso.");
        }

        if( courseService.findByName(name)) {
            throw new Error("Curso já cadastrado!");
        }

        try {
            const course = await courseService.addNewCourse(name, topics)
            response.json(course);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível excluir o curso.");
        }
    }

    async updateCourse(request: Request, response: Response) {
        const {id,  name, topics } = request.body;
        
         try {
            const courseService = new CourseService();
            const course = await courseService.updateCourse(id, name, topics)
            response.json(course);
        } catch(error){
       if( name.trim() == '' &&  topics.length <= 0){
            throw new Error("Erro no parâmetro enviados do curso.");
        }

        if(!id){
            throw new Error("O id não pode ser vazio");
        }

            console.error(error);
            throw new Error("Não foi possível excluir o curso.");
        }
    }
}

export { CourseController };
