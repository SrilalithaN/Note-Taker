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
  const { id } = req.params;

  if (id) {
    deleteNote(id, "./db/db.json");
    res.json(`note deleted!`);
  } else {
    res.error(`Error deleting note`);
  }
});
module.exports = { api };
