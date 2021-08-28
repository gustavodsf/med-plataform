import { Request, Response } from "express";
import { QuestionService } from '../service/QuestionService';

class QuestionController {

    async getAll(request: Request, response: Response) {
        try {
            const questionService = new QuestionService();
            const questions = await questionService.getAllQuestion();
            return response.json(questions);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível listar as questões.");
        }
    }

    async deleteQuestion(request: Request, response: Response) {
        try {
            const id = request.params.id
            const questionService = new QuestionService();
            const question = await questionService.deleteQuestion(id)
            return response.json(question);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível excluir o curso.");
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const id = request.params.id
            const questionService = new QuestionService();
            const question = await questionService.getQuestion(id);
            return response.json(question);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível localizar a questão.");
        }
    }

    async getQuestionsOfTopic(request: Request, response: Response) {
        try {
            const topic = request.params.topic
            const questionService = new QuestionService();
            const question = await questionService.getQuestionsOfTopic(topic);
            return response.json(question);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível localizar a questão.");
        }
    }

    async getSomeSimulatedQuestions(request: Request, response: Response) {
        try {
            const amount = parseInt(request.params.amount);
            const questionService = new QuestionService();
            const question = await questionService.getSomeSimulatedQuestions(amount);
            return response.json(question);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível localizar a questão.");
        }
    }

    async addQuestion(request: Request, response: Response) {
        console.log(request.body)
        const { proof, question, utterance, options, answer, justification, theme, course_id, topic_id, simulated } = request.body;
        const questionService = new QuestionService();

        if( utterance.trim() == '' &&  options.length <= 0 && !answer){
            throw new Error("Erro no parâmetro enviados para a questão.");
        }

        try {
            const questionObj = await questionService.addQuestion(proof, question, utterance, options, answer, justification, theme, course_id, topic_id, simulated)
            response.json(questionObj);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível adicionar a questáo.");
        }
    }

    async updateQuestion(request: Request, response: Response) {
        const { id, proof, question, utterance, options, answer, justification, theme, course_id, topic_id, simulated } = request.body;
        const questionService = new QuestionService();

        if( utterance.trim() == '' &&  options.length <= 0 && !answer){
            throw new Error("Erro no parâmetro enviados para a questão.");
        }

        if(!id){
            throw new Error("O id não pode ser vazio");
        }

        try {
            const questionObj = await questionService.updateQuestion(id, proof, question, utterance, options, answer, justification, theme, course_id, topic_id, simulated)
            response.json(questionObj);
        } catch(error){
            console.error(error);
            throw new Error("Não foi possível alterar a questáo.");
        }
    }
}

export { QuestionController }