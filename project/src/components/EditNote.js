import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); //Updated to useNavigate

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching note details:', error);
      }
    };

    fetchNoteDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Send a request to the server to update the note
      await axios.put(`http://localhost:4001/api/notes/${id}`, {
        title,
        content,
      });

      //Navigate to the view page after successful update
      navigate(`/view/${id}`); // Use navigate function
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
