const { Schema, model } = require("mongoose");

const tallerSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  descripción: String,
  duración: String,
  imagen: String,
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  usuarios: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

const Taller = model("Taller", tallerSchema);

module.exports = Taller;
