const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email es un campo obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    contraseña: {
      type: String,
      required: [true, 'Contraseña es un campo obligatorio.']
    },
    nombreCompleto: String,
    nacionalidad: String,
    residencia: String,
    imagen: String,
    tiempoNuevoPais: String,
    especializacion: String,
    rol: {
      type: String,
      enum: ["user", "psicologo", "admin"],
      default: "user"
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
