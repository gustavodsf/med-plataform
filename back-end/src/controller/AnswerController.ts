import { Request, Response } from "express";
import { AnswerService } from '../service/AnswerService';

class AnswerController {

  async add(request: Request, response: Response) {
    
    const { user_id, course_id, topic_id, question_id, user_answer, question_answer } = request.body;

    if(user_answer === 0){
        throw new Error("repostas não informada")
    }

    try {
        const answerService = new AnswerService();
        const answer = await answerService.addNewAnswer(user_id, course_id, topic_id, question_id, user_answer, question_answer);
        return response.json(answer);
    } catch(error){
        console.error(error);
        throw new Error("Não foi possível adicionar a reposta do usuário");
    }
  }

  async getAnswerByUserTopic(request: Request, response: Response){
    try {
      const topic_id = request.params.topic_id
      const user_id = request.params.user_id
      const answerService = new AnswerService();
      const answers = await answerService.getQuestionByTopicIdUserId(user_id, topic_id);
      return response.json(answers);
    } catch(error){
        console.error(error);
        throw new Error("Não foi possível localizar resposta para o usuário e tópico");
    }
  }
}

export { AnswerController }