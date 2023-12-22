// NoteList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    //Fetch notes from the server and update state
  }, []);

  return (
   <div>
      <h1>Note List</h1>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <p>Note Added on: {new Date(note.timestamp).toLocaleString()}</p>
          </li>
        ))}
      
    </div>
  );
};



export default NoteList;
