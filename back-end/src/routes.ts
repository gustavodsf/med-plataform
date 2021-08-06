import { Router } from "express";

import { SendEmailController } from "./controller/SendEmailController";
import { UserController } from "./controller/UserController";

const router = Router();

const sendEmailController = new SendEmailController();
const userController = new UserController();

router.get("/send/email", sendEmailController.handle);


router.get("/user/",       userController.getAll);
router.get("/user/:id",    userController.getById);
router.put("/user",        userController.updateUser);
router.post("/user",       userController.addUser);
router.delete("/user/:id", userController.deleteUser);


export { router };