import { Router } from "express";

import { SendEmailController } from "./controller/SendEmailController";
import { UserController } from "./controller/UserController";
import { CourseController } from "./controller/CourseController";
import { QuestionController } from "./controller/QuestionController";

const router = Router();

const sendEmailController = new SendEmailController();

const userController = new UserController();
const courseController = new CourseController();
const questionController = new QuestionController();

// ***********
//  USER
// ***********
router.get("/user/",       userController.getAll);
router.get("/user/:id",    userController.getById);
router.put("/user",        userController.updateUser);
router.post("/user",       userController.addUser);
router.delete("/user/:id", userController.deleteUser);

// ***********
//  Curso
// ***********
router.get("/course/",       courseController.getAll);
router.get("/course/:id",    courseController.getById);
router.put("/course",        courseController.updateCourse);
router.post("/course",       courseController.addCourse);
router.delete("/course/:id", courseController.deleteCourse);

// ***********
//  Question
// ***********
router.get("/question/:id",               questionController.getById);
router.get("/question/simulated/:amount", questionController.getSomeSimulatedQuestions)
router.get("/question/topic/:topic",      questionController.getQuestionsOfTopic);
router.put("/question",                   questionController.updateQuestion);
router.post("/question",                  questionController.addQuestion);
router.delete("/question/:id",            questionController.deleteQuestion);


// ***********
//  Email
// ***********
router.post("/send/email", sendEmailController.handle);
router.post("/send/welcome/email", sendEmailController.sendCreateUserMessage);


export { router };