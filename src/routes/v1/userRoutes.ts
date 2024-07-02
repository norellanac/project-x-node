import { Router } from "express";
import { createUser, getUsers } from "../../controllers/v1/userController";

const router = Router();

router.get("/", getUsers);
router.get("/", createUser);
router.get("/create", createUser);

export default router;
