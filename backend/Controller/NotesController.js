const NotesModel = require("../models/Notes-model");
const UserInfo = require("../models/User-model");
const { validationResult } = require("express-validator");

module.exports.fetchnotes = async (req, res) => {
  try {
    let Userid = req.user._id;
    let notes = await NotesModel.find({ user: Userid });
    return res.status(200).json({ message: "success", notes });
  } catch (err) {
    console.log("Unable fetching notes");
    res.status(500).json({ message: "Unable to fetch notes" });
  }
};

module.exports.fetchnote = async (req, res) => {
  try {
    let userid = req.user._id;
    let user = await UserInfo.findById(userid);
    //case of user not exist has been handled by middleware
    if (user.notes.indexOf(req.params.id) === -1) {
      return res.status(409).json({ message: "Permisson denied" });
    }
    const note = await NotesModel.findById(req.params.id);
    //benifit of using the below function or simpley update is that it doesnot require to call the .save() function, it automatically do that
    return res.status(200).json({ message: "Note fetched successfully", note });
  } catch (err) {
    console.log("Unable to fetch note", err.message);
    res.status(500).json({ message: "Unable to fetch note" });
  }
};
module.exports.CreateNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors exist, return them
      return res.status(400).json({ errors: errors.array() });
    }
    let userid = req.user._id;
    let user = await UserInfo.findById(userid);
    let ExistingNote = await NotesModel.findOne({
      title: req.body.title,
      user: userid,
    });
    if (ExistingNote) {
      return res.status(409).json({ message: "Title already exists" });
    }
    let NewNote = await NotesModel.create({
      user: userid,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || "General",
    });
    // await NewNote.save();
    user.notes.push(NewNote._id);
    await user.save();
    return res.json({ message: "Note created successfully", note: NewNote });
  } catch (err) {
    console.log("Something went wrong", err);
    return res.status(500).json({ message: "Unable to create note" });
  }
};

module.exports.updatenote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors exist, return them
      return res.status(400).json({ errors: errors.array() });
    }
    let userid = req.user._id;
    let user = await UserInfo.findById(userid);
    //case of user not exist has been handled by middleware
    if (user.notes.indexOf(req.params.id) === -1) {
      return res
        .status(409)
        .json({ message: "This note had note been created by the user" });
    }
    //benifit of using the below function or simpley update is that it doesnot require to call the .save() function, it automatically do that
    const updatedNote = await NotesModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date || Date.now(),
      },
      { new: true } // This will return the updated document
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "note not found" });
    }
    return res
      .status(200)
      .json({ message: "Note updated successfully", updatedNote });
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).json({ message: "Unable to update note" });
  }
};

module.exports.deletenote = async (req, res) => {
  try {
    let Userid = req.user._id;
    let user = await UserInfo.findById(Userid);
    let Index = user.notes.indexOf(req.params.id);
    if (Index === -1) {
      return res.status(409).json({ message: "You cannot delete this note" });
    }
    let DeletedNote = await NotesModel.findByIdAndDelete(req.params.id);
    if (!DeletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    user.notes.splice(Index, 1);
    user.save();
    return res
      .status(200)
      .json({ message: "Note deleted successfully", DeletedNote });
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).json({ message: "Unable to delete note" });
  }
};
