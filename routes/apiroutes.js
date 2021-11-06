const api = require("express").Router();
const {
  readNote,
  readAndAppendNote,
  deleteNote,
} = require("../helpers/saveData");
const { v4: uuidv4 } = require("uuid");

api.get("/notes", (req, res) => {
  readNote("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

api.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppendNote(newNote, "./db/db.json");
    res.json(`Added a new note`);
  } else {
    res.error(`Error adding note`);
  }
});

api.delete("/notes/:id", (req, res) => {
  console.log(`${req.method} request received to delete the note`);
  const { id } = req.params;

  console.log("Deleted the note with id " + id);
  if (id) {
    deleteNote(id, "./db/db.json");
    res.json(`note deleted!`);
  } else {
    res.error(`Error deleting note`);
  }
});
module.exports = api;
