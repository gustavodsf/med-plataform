import { getRepository } from 'fireorm';
import { Question } from '@model/Question';

class QuestionService {
  async getAllQuestion() {
    const questionRepository = getRepository(Question);
    const questions = await questionRepository.find();
    return questions;
  }

  async getQuestionsOfTopic(topic: string) {
    const questionRepository = getRepository(Question);
    const question = await questionRepository
      .whereEqualTo((crs) => crs.topic_id, topic)
      .find();
    return question;
  }

  async getSomeSimulatedQuestions(amount: number) {
    const questionRepository = getRepository(Question);
    const questions = await questionRepository
      .whereEqualTo((crs) => crs.simulated, true)
      .find();

    if (questions.length < amount) {
      return questions;
    }

    const totalQuestions = questions.length;
    const numbers = this.generateRandomNumbers(amount, totalQuestions);
    const filteredQuestion = numbers.map((idx) => questions[idx]);

    return filteredQuestion;
  }

  async getQuestion(id: string) {
    const questionRepository = getRepository(Question);
    const question = await questionRepository.findById(id);
    return question;
  }

  async addQuestion(
    proof: string,
    question: string,
    utterance: string,
    options: Array<string>,
    answer: number,
    justification: string,
    theme: Array<string>,
    course_id: string,
    topic_id: string,
    simulated: boolean,
  ) {
    const questionRepository = getRepository(Question);
    let questionObj = new Question();
    questionObj.proof = proof;
    questionObj.question = question;
    questionObj.utterance = utterance;
    questionObj.options = options;
    questionObj.answer = answer;
    questionObj.justification = justification;
    questionObj.theme = theme;
    questionObj.course_id = course_id;
    questionObj.topic_id = topic_id;
    questionObj.simulated = simulated;
    questionObj = await questionRepository.create(questionObj);
    return questionObj;
  }

  async updateQuestion(
    id: string,
    proof: string,
    question: string,
    utterance: string,
    options: Array<string>,
    answer: number,
    justification: string,
    theme: Array<string>,
    course_id: string,
    topic_id: string,
    simulated: boolean,
  ) {
    const questionRepository = getRepository(Question);
    let questionObj = new Question();
    questionObj.id = id;
    questionObj.proof = proof;
    questionObj.question = question;
    questionObj.utterance = utterance;
    questionObj.options = options;
    questionObj.answer = answer;
    questionObj.justification = justification;
    questionObj.theme = theme;
    questionObj.course_id = course_id;
    questionObj.topic_id = topic_id;
    questionObj.simulated = simulated;
    questionObj = await questionRepository.update(questionObj);
    return questionObj;
  }

  async deleteQuestion(id: string) {
    const questionRepository = getRepository(Question);
    await questionRepository.delete(id);
    return { message: 'Questão removido com sucesso!' };
  }

  generateRandomNumbers(amount: number, numberQuestions: number) {
    const numbers = [];

    while (numbers.length < amount) {
      const random = Math.floor(Math.random() * (numberQuestions - 1));

      if (numbers.indexOf(random) == -1) numbers.push(random);
    }
    return numbers;
  }
}

export { QuestionService };
