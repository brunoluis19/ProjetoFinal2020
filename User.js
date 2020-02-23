const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    nome: String,
    password: String,
})

UserSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    }
    
UserSchema.methods.validPassword = function (password) {
       
       return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema); 