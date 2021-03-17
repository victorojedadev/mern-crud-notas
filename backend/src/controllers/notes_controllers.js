const notesCtrl = {};

const Note = require('../models/notes_models');

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes)
};

notesCtrl.createNote = async (req, res) => {
    const {title, description, date, author} = req.body;
    const newNote = new Note({
        title,
        description,
        date,
        author
    });
    await newNote.save();
    res.json({message: 'Nota Creada'});
};

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
};

notesCtrl.updateNote = async (req, res) => {
    
    const {title, description, date, author} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,
        description,
        date,
        author});
    res.json({message: 'Nota actualizada'})
};

notesCtrl.deleteNote = async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'Nota Eliminada'});
};

module.exports = notesCtrl;