const util = require("util");
const fs = require("fs");

const readNote = util.promisify(fs.readFile);
const writeNote = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.info(`\n Data written to ${destination}`)
  );

const readAndAppendNote = (content, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeNote(file, parsedData);
    }
  });
};
const deleteNote = (id, file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      filteredData = parsedData.filter((note) => id !== note.id);

      
      writeNote(file, filteredData);
    }
  });
};
module.exports = {
  readNote,
  writeNote,
  readAndAppendNote,
  deleteNote,
};
