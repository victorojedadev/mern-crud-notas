import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-2">
        <Route path="/" exact component={NotesList} />
        <Route path="/editar/:id" component={CreateNote} />
        <Route path="/nuevo" component={CreateNote} />
        <Route path="/usuario" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
