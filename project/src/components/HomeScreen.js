import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    //Fetch notes from the server and update state
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

   //Function to fetch a single note by its ID
   const fetchNoteById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4001/api/notes/${id}`);
      //Handle the fetched note data, e.g., navigate to a view page
      console.log('Fetched note by ID:', response.data);
    } catch (error) {
      console.error('Error fetching note by ID:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '80px' }}>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="mb-4">Welcome to Your Note List</h1>
          <p className="guide">Explore and manage your notes effortlessly.</p>
          <p className="guide">Choose note by ID to simply edit or delete.</p>
        </div>

        <div className="row mt-5">
          {notes.map((note) => (
            <div key={note._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                      <Link to={`/view/${note._id}`} onClick={() => fetchNoteById(note._id)}>
                        <strong>{note.title}</strong>
                      </Link>
                  </h5>
                  <p>{new Date(note.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      

        <div className="text-center mt-4">
          <Link to="/createNote" className="btn btn-primary btn-lg">
            Add New Note
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
