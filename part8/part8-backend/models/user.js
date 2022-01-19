const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { schema } = require('./person')

const userSchema = new mongoose.Schema({
  usernmae: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }
  ]
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User