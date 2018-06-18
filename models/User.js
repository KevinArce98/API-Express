const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
   	email: { type: String, required: true},
   	role: { type: mongoose.Schema.Types.ObjectId,
   			ref: 'roles', required: true}
});

module.exports = mongoose.model('users', user);