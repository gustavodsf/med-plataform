import { getRepository } from 'fireorm';

import { Topic } from '../model/Topic';

class TopicService {

  async getAllTopic() {
    const topicRepository = getRepository(Topic);
    return await topicRepository.orderByAscending('name').find()
  }

  async getCourseId(courseId: string) {
    const topicRepository = getRepository(Topic);
    const topics = await topicRepository.whereEqualTo("courseId", courseId).orderByAscending("name").find();
    return topics;
  }

  async getTopic(id: string) {
    const topicRepository = getRepository(Topic);
    return await topicRepository.findById(id);
  }
}

export { TopicService };