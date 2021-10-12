import { Request, Response } from "express";

import { TopicService } from '@service/TopicService';

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
        throw new Error("Não foi possível localizar um tópico associado ao curso informado.");
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const id = request.params.id
      const topicService = new TopicService();
      const topic = await topicService.getTopic(id);
      return response.json(topic);
    } catch(error){
        console.error(error);
        throw new Error("Não foi possível localizar um tópico com id informado.");
    }
  }
}

export { TopicController }