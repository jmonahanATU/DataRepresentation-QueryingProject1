const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4001;

//Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.hcqirr6.mongodb.net/MYDB?retryWrites=true&w=majority');

//Define a schema for the "notes" collection
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now, //Set the default value to the current date and time
  },
});

//Create a model based on the schema
const Note = mongoose.model('Note', noteSchema);

//Middleware for handling JSON data
app.use(express.json());
 
//Default route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

//GET all notes
app.get('/api/notes', async (req, res) => {
    try {
      const notes = await Note.find();
      console.log('Retrieved notes:', notes); //Log retrieved notes
      res.json(notes);
    } catch (error) {
      console.error('Error retrieving notes:', error); //Log errors
      res.status(500).json({ message: error.message });
    }
  });

  // GET a specific note by ID
  app.get('/api/notes/:id', async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      console.error('Error fetching note by ID:', error);
      res.status(500).json({ message: error.message });
    }
  });

//POST a new note
app.post('/api/notes', async (req, res) => {
  const note = new Note({
    title: req.body.title, 
    content: req.body.content,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update a note by ID
app.put('/api/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
      } catch (error) {
        console.error('Mongoose Update Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    //Delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
    try {
      console.log('Deleting note with ID:', req.params.id);
      await Note.findByIdAndDelete(req.params.id);
      console.log('Note deleted successfully.');
      res.json({ message: 'Note deleted' });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
