import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


const ViewNote = () => {
    // Extract the 'id' parameter from the URL using react-router-dom's useParams hook
  const { id } = useParams();
    // State to store the note retrieved from the server
  const [note, setNote] = useState(null);

    // useEffect hook to fetch the note data when the component mounts
  useEffect(() => {
        // Define an asynchronous function to fetch the note by ID
    const fetchNoteById = async () => {
      try {
                // Make an HTTP GET request to the backend to retrieve the note data
        const response = await axios.get(`http://localhost:4001/api/notes/${id}`);
                // Update the state with the retrieved note data
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note by ID:', error);
      }
    };

        // Call the fetchNoteById function when the component mounts or when the 'id' parameter changes
    fetchNoteById();
  }, [id]);

    // If the note data is still loading, display a loading message
  if (!note) {
    return <div>Loading...</div>;
  }

  // Once the note data is available, render the note details along with Edit and Delete links
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Link to={`/edit/${note._id}`}>Edit</Link>
      <br></br>
      <Link to={`/delete/${note._id}`}>Delete</Link>
    </div>
  );
};

export default ViewNote;
