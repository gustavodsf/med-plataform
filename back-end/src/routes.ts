import { Router } from "express";
import { SendEmailController } from "./controller/SendEmailController";
import { UserController } from "./controller/UserController";
import { CourseController } from "./controller/CourseController";
import { QuestionController } from "./controller/QuestionController";
import { TopicController } from './controller/TopicController';
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const sendEmailController = new SendEmailController();

const userController = new UserController();
const courseController = new CourseController();
const questionController = new QuestionController();
const topicController = new TopicController();

// ***********
//  USER
// ***********
router.get("/user/",       ensureAdmin, userController.getAll);
router.get("/user/:id",    ensureAdmin, userController.getById);
router.put("/user",        ensureAdmin, userController.updateUser);
router.post("/user",       ensureAdmin, userController.addUser);
router.delete("/user/:id", ensureAdmin, userController.deleteUser);

// ***********
//  Curso
// ***********
router.get("/course/",       ensureAdmin, courseController.getAll);
router.get("/course/:id",    ensureAdmin, courseController.getById);
router.put("/course",        ensureAdmin, courseController.updateCourse);
router.post("/course",       ensureAdmin, courseController.addCourse);
router.delete("/course/:id", ensureAdmin, courseController.deleteCourse);

// ***********
//  Question
// ***********
router.get("/question/",                  ensureAdmin, questionController.getAll);
router.get("/question/:id",               ensureAdmin, questionController.getById);
router.get("/question/simulated/:amount", ensureAdmin, questionController.getSomeSimulatedQuestions)
router.get("/question/topic/:topic",      ensureAdmin, questionController.getQuestionsOfTopic);
router.put("/question",                   ensureAdmin, questionController.updateQuestion);
router.post("/question",                  ensureAdmin, questionController.addQuestion);
router.delete("/question/:id",            ensureAdmin, questionController.deleteQuestion);
// ***********
//  Topic
// ***********
router.get("/topic/",          ensureAdmin, topicController.getAll);
router.get("/topic/:courseId", ensureAdmin, topicController.getCourseId);



// ***********
//  Email
// ***********
router.post("/send/email",         ensureAdmin, sendEmailController.handle);
router.post("/send/welcome/email", ensureAdmin, sendEmailController.sendCreateUserMessage);


export { router };