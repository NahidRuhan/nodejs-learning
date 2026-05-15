import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()

router.get('/', userController.getUsers)

router.get("/:id", userController.getUser)

router.post('/', userController.createUser)

router.put("/:id", userController.updateUser)

router.delete("/:id", userController.deleteUser)

export const userRoute = router