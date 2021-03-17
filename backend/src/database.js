const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/mern_app_notas';

mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
});

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('DB is connected');
});