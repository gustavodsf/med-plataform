import { Router } from "express";

import { ensureAdmin } from "@middlewares/ensureAdmin";
import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";

import { AnswerController } from '@controller/AnswerController';
import { CourseController } from "@controller/CourseController";
import { PdfController } from '@controller/PdfController';
import { QuestionController } from "@controller/QuestionController";
import { SendEmailController } from "@controller/SendEmailController";
import { TopicController } from '@controller/TopicController';
import { UserController } from "@controller/UserController";
import { VideoController } from '@controller/VideoController';

const router = Router();

const answerController = new AnswerController();
const courseController = new CourseController();
const pdfController = new PdfController();
const questionController = new QuestionController();
const sendEmailController = new SendEmailController();
const topicController = new TopicController();
const userController = new UserController();
const videoController = new VideoController();

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
router.get("/topic/course/:courseId", ensureAdmin, topicController.getCourseId);
router.get("/topic/:id", ensureAdmin, topicController.getById);
// ***********
//  Email
// ***********
router.post("/send/email",         ensureAdmin, sendEmailController.handle);
router.post("/send/welcome/email", ensureAdmin, sendEmailController.sendCreateUserMessage);
// ***********
//  files
// ***********
router.get("/pdf/:fileName", ensureAuthenticated, pdfController.getPdfWithName);
router.get("/video/:fileName", videoController.getVideoWithName);
// ***********
// answer
// ***********
router.post("/answer", ensureAuthenticated, answerController.add);
router.get("/answer/:user_id/:topic_id", ensureAuthenticated, answerController.getAnswerByUserTopic);

export { router };