import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddNote = ({ addNote }) => {
  //State to manage the form input values
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  //State to manage loading state during HTTP request
  const [isLoading, setIsLoading] = useState(false);
  //State to manage error messages
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); //Clear previous errors
    setIsLoading(true);

    try {
      //Make an HTTP POST request to the backend to add the new note
      const response = await axios.post('http://localhost:4001/api/notes', { title, content });
      
      //Optionally, update your local state or perform other actions as needed
      console.log('Note added successfully:', response.data);

      //Call the addNote function passed as a prop to update the parent component's state
      addNote({
        _id: response.data._id, //Assuming the server returns the ID of the new note
        title: response.data.title,
        content: response.data.content,
      });

      //Clear the form
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding note:', error.message);
      setError('Failed to add note. Please try again.'); // Set an error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-note-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Note'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddNote;
