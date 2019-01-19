var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  author: {
    type: String
  },
  body: {
    type: String
  }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;