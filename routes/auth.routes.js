const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const User = require("../models/User.model");
const {tokenValidation} = require('../middlewares/auth.middlewares');


const router = require("express").Router();

// POST "/api/auth/registro-usuario"
router.post("/registro-usuario", async (req, res, next) => {
const {email, contraseña, nombreCompleto,nacionalidad, residencia, imagen, tiempoNuevoPais, especializacion, rol} = req.body

if(!email || !contraseña){
    res.status(400).json({errorMessage: "Email y contraseña son obligatorios"})
    return 
}
 
// Verificar que la constraseña sea fuerte

const contraseñaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
if (contraseñaRegex.test(contraseña) === false) {
  res.status(400).json({errorMessage: "La contraseña debe tener min 8 caracteres, una minuscula, una mayuscula y algun otro caracter"})
  return 
}

try {
    
const usuarioEncontrado = await User.findOne({email: email})
if(usuarioEncontrado !== null){

    res.status(400).json({errorMessage: "Usuario ya registrado con ese correo electronico"})  
    return
}

const salt = await bcrypt.genSalt(12)
const hashContraseña = await bcrypt.hash(contraseña, salt)

await User.create({
    email,
    contraseña: hashContraseña,
    nombreCompleto,
    nacionalidad,
    residencia,
    imagen,
    tiempoNuevoPais,
    especializacion,
    rol
  })

  res.sendStatus(201)


} catch (error) {
  next(error)  
}

})

//POST "/api/auth/iniciar-sesion"
router.post("/iniciar-sesion", async (req, res, next) => {

    const {email, contraseña} = req.body

    if(!email || !contraseña) {
        res.status(400).json({errorMessage: "Email y contraseña son obligatorios"})
        return   
    }

    try {
        const usuarioEncontrado = await User.findOne({email: email})
        console.log(usuarioEncontrado)

        if (usuarioEncontrado === null) {
            res.status(400).json({errorMessage: "Usuario no registrado con ese correo electronico"})
            return 
          }

        const siContraseñaCorrecta = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña)
        if(siContraseñaCorrecta === false){
            res.status(400).json({errorMessage: "Contraseña incorrecta"})
            return
        }

        //usuario autentificado.

        const payload ={
            _id: usuarioEncontrado._id,
            rol: usuarioEncontrado.rol,
            nombreCompleto: usuarioEncontrado.nombreCompleto
        }

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "7d"}
        )

        res.status(200).json({ authToken })


    } catch (error) {
        next(error)
    }
})

// GET "/api/auth/verify" => validar el token 
router.get("/verify", tokenValidation, (req, res, next) => {

    console.log(req.payload) // ! para que el backend sepa quien es el usuario dueño del token. QUIEN ESTA HACIENDO LAS LLAMADAS.
  
    res.status(200).json(req.payload) // ! esto es para que el frontend sepa quien es el usuario dueño de ese token. QUIEN ESTA NAVEGANDO POR LA PAGINA.
  
  })


module.exports = router