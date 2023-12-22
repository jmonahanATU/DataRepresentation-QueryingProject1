import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import HomeScreen from './components/HomeScreen.js';
import NoteList from './components/NoteList';
import ViewNote from './components/ViewNote';
import DeleteNote from './components/DeleteNote.js';
import './App.css'; //Import the App.css file


function App() {
  //Integrate state for notes
  const [notes, setNotes] = useState([]);

  //Create a function to add notes
  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };
  return (
    <Router>
      <div className="App">
        <Navbar bg="secondary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Everyday-Notes</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/createNote">AddNote</Nav.Link>
              <Nav.Link href="/NoteList">NoteList</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/NoteList" element={<NoteList />} />
          <Route path="/createNote" element={<AddNote addNote={addNote} />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/view/:id" element={<ViewNote />} />
          <Route path="/delete/:id" element={<DeleteNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
