import { Router } from "express";

import { SendEmailController } from "./controller/SendEmailController";
import { UserController } from "./controller/UserController";
import { CourseController } from "./controller/CourseController";

const router = Router();

const sendEmailController = new SendEmailController();

const userController = new UserController();
const courseController = new CourseController();

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
router.get("/user/",       userController.getAll);
router.get("/user/:id",    userController.getById);
router.put("/user",        userController.updateUser);
router.post("/user",       userController.addUser);
router.delete("/user/:id", userController.deleteUser);



router.post("/send/email", sendEmailController.handle);

export { router };