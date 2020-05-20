const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

let userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    bcrypt.hash(this.password, 10, //10 é o número de caracteres aleatórios que serão inseridos
      (err, hashedPassword) => {
        if (err) {
          next(err)
        } else {
          this.password = hashedPassword
          next()
        }
      })
  }
})

/* Função que verifica se o password passado é igual ao registrado no banco */
userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, same) {
    if (error) {
      callback(error)
    } else {
      callback(error, same)
    }
  })
}

module.exports = mongoose.model("User", userSchema)