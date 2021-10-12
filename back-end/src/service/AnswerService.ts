import { getRepository } from 'fireorm';
import { Answer } from '@model/Answer';

class AnswerService {
  async addNewAnswer(
    user_id: string,
    course_id: string,
    topic_id: string,
    question_id: string,
    user_answer: number,
    question_answer: number,
  ) {
    const answerRepository = getRepository(Answer);
    const answer = new Answer();
    answer.course_id = course_id;
    answer.topic_id = topic_id;
    answer.question_id = question_id;
    answer.question_answer = question_answer;
    answer.user_answer = user_answer;
    answer.user_id = user_id;
    answer.date = new Date();
    const answerCreated = await answerRepository.create(answer);
    return answerCreated;
  }

  async getQuestionByTopicIdUserId(user_id: string, topic_id: string) {
    const answerRepository = getRepository(Answer);
    const answers = await answerRepository
      .whereEqualTo((aws) => aws.user_id, user_id)
      .whereEqualTo((awsfiltered) => awsfiltered.topic_id, topic_id)
      .find();
    return answers;
  }
}

export { AnswerService };
