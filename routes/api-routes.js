import express from "express";
import noteApiController from "../controllers/note-api-controller.js";

const router = express.Router();

router.get("/", noteApiController.getAllNotes);
// router.get('/:id/', noteApiController.getSingleNote);
router.post("/", noteApiController.createNote);
// router.put('/:id/', noteApiController.updateNote);
// router.delete('/:id', noteApiController.deleteNote);

export const noteApiRoutes = router;

export default noteApiRoutes;
