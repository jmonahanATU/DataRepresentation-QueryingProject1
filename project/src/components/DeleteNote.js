import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      //Make an HTTP DELETE request to the backend to delete the note
      await axios.delete(`http://localhost:4001/api/notes/${id}`);

      //Redirect to the home screen after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('An error occurred while deleting the note.');
    }
  };

  return (
    <div>
      <h1>Delete Note</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Are you sure you want to delete this note?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/view/${id}`)}>Cancel</button>
    </div>
  );
};

export default DeleteNote;
