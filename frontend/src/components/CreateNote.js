import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CreateNote extends Component {

  state = {
    title: '',
    description: '',
    date: new Date(),
    userSelected: '',
    users: [],
    editing: false,
    _id: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users');
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map(user => user.username),
        userSelected: res.data[0].username
      })
    }

    if (this.props.match.params.id) {
      const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
      this.setState({
        title: res.data.title,
        description: res.data.description,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editing) {
      const updatedNote = {
        title: this.state.title,
        description: this.state.description,
        author: this.state.userSelected,
        date: this.state.date
      };
      await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
    } else {
      const newNote = {
        title: this.state.title,
        description: this.state.description,
        author: this.state.userSelected,
        date: this.state.date
      };
      axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/';

  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({ date });
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 mt-4">
        <div className="card card-body">
          <h4>{this.props.match.params.id ? 'Editar Nota' : 'Crear Nota'}</h4>
          <form onSubmit={this.onSubmit}>
            {/* SELECT THE USER */}
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                onChange={this.onInputChange}
                name="userSelected"
                required>
                {
                  this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))
                }
              </select>
            </div>
            {/* Note Title */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Titulo"
                onChange={this.onInputChange}
                name="title"
                value={this.state.title}
                required />
            </div>
            {/* Note Description */}
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Descripción"
                name="description"
                onChange={this.onInputChange}
                value={this.state.description}
                required>
              </textarea>
            </div>
            {/* Note Date */}
            <div className="form-group">
              <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
            </div>
            <div className='buttons-form-container'>
              <button className="btn btn-primary btn-save">
                Guardar
                <i className="material-icons"> save </i>
              </button>
              <Link to={""} className="btn btn-secondary btn-cancel">Cancelar
                <i className="material-icons"> cancel </i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
