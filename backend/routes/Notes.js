const express = require("express");
const router = express.Router();
const { FetchUser } = require("../middleware/FetchUser");
const {
  fetchnotes,
  fetchnote,
  CreateNote,
  updatenote,
  deletenote,
} = require("../Controller/NotesController");
const { body, validationResult } = require("express-validator");
router.post(
  "/createnote",
  [
    body("title").isLength({ min: 3 }).withMessage("Title is required"),
    body("description")
      .isLength({ min: 3 })
      .withMessage("Description is required"),
  ],
  FetchUser,
  CreateNote
);
router.get("/fetchnotes", FetchUser, fetchnotes);
router.get("/fetchnote/:id", FetchUser, fetchnote);
router.put(
  "/updatenote/:id",
  [
    body("title").isLength({ min: 3 }).withMessage("Title is required"),
    body("description")
      .isLength({ min: 3 })
      .withMessage("Description is required"),
  ],
  FetchUser,
  updatenote
);
router.delete("/deletenote/:id", FetchUser, deletenote);
module.exports = router;
