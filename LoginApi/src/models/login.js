const mongoose = require('mongoose');

// Esquema de usuario
const user = mongoose.model( "User", new mongoose.Schema({  
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}));




module.exports = user;
