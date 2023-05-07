import express from "express";
import { noteAppController } from "../controllers/note-app-controller.js";

const router = express.Router();

router.get("/", noteAppController.getIndexDocument);
router.get("/create", noteAppController.getCreateDocument);

export const noteRoutes = router;

export default noteRoutes;
