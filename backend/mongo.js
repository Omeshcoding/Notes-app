const mongoose = require('mongoose');
const { Schema } = mongoose;

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://umesh:${password}@cluster0.zgujvsu.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'This is Freaking Working ',
  important: true,
});

note.save().then((result) => {
  console.log(result);
  console.log('note saved!');
  mongoose.connection.close();
});
