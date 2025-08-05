const express = require("express");
const { getAllNotes, getNoteById, createNote, editNote, deleteNote } = require("../controller/notesController");
const router = express.Router();
const { requireAuth } = require('../middleware/clerkAuth');

router.get("/", requireAuth, getAllNotes);
router.get("/:id", requireAuth, getNoteById);
router.post("/", requireAuth, createNote);
router.put("/:id", requireAuth, editNote);
router.delete("/:id", requireAuth, deleteNote);

module.exports = router;