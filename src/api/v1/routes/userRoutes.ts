import { Router } from "express";
import { store, index, show, update, destroy, } from "../controllers/userController";

const router = Router();
router.get("/", index);
router.post("/store", store);
router.get("/show/:id", show);
router.put("/update/:id", update);
router.delete("/delete/:id", destroy);


export default router;
