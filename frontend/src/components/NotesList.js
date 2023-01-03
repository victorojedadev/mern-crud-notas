import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
// import { Redirect } from "react-router-dom";

export default class NotesList extends Component {

  state = {
    notes: []
  }

  async componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    const res = await axios.get('http://localhost:4000/api/notes')
    this.setState({
      notes: res.data
    });
  }

  deleteNote = async (noteId) => {
    await axios.delete('http://localhost:4000/api/notes/' + noteId);
    this.getNotes();
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className="col-md-4 pt-2" key={note._id}>
              <div className="card card-container fadeInLeftBig">
                <div className="card-header d-flex justify-content-between">
                  <h5>{note.title}</h5>
                </div>
                <div className="card-body">
                  <p>
                    {note.description}
                  </p>
                  <p>
                    Autor: {note.author}
                  </p>
                  <p>
                    {format(note.createdAt)}
                  </p>
                </div>
                <div className="card-footer">
                  <Link to={"/editar/" + note._id} className="btn btn-warning btn-edit">
                    Editar 
                    <i className="material-icons"> edit </i>
                  </Link>
                  <button className="btn btn-danger btn-delete" onClick={() => this.deleteNote(note._id)}>
                    Eliminar
                    <i className="material-icons"> delete </i>
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
