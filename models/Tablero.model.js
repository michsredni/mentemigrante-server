const { mongoose, model } = require("mongoose");

const tableroSchema = new mongoose.Schema({
    titulo: String,
    imagen: String, // <- Cloudinary
    descripcion: String,
    creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
} 

})

const Tablero = model("Tablero", tableroSchema);

module.exports = Tablero;