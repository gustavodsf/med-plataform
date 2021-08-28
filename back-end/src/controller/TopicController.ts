import { Request, Response } from "express";

import { TopicService } from '../service/TopicService';

class TopicController {

  async getAll(request: Request, response: Response) {
    try {
      const topicService = new TopicService();
      const topics = await topicService.getAllTopic();
      return response.json(topics);
    } catch(error){
        console.error(error);
        throw new Error("Não foi possível listar os tópicos.");
    }
  }

  async getCourseId(request: Request, response: Response) {
    try {
      const courseId = request.params.courseId
      const topicService = new TopicService();
      const topics = await topicService.getCourseId(courseId);
      return response.json(topics);
    } catch(error){
        console.error(error);
        throw new Error("Não foi possível um tópico associado ao curso informado.");
    }
  }
}

export { TopicController }