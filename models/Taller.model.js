const { mongoose, model } = require("mongoose");

const tallerSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  descripcion: String,
  duracion: String,
  imagen: String,
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const Taller = model("Taller", tallerSchema);

module.exports = Taller;
