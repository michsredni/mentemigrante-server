const router = require("express").Router();

const { tokenValidation } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// GET "/api/usuarios/propio" => que user puede ver su perfil
router.get("/propio", tokenValidation, async (req, res, next) => {

    console.log(req.payload)

    try {
    
        const response = await User.findById(req.payload._id)
        console.log(response)
        res.json(response)
    
      } catch (error) {
        console.log(error)
        next(error)
      }

})

// PUT "/api/usuarios/propio" => usuario pueda editar su propia info
router.put("/propio", tokenValidation, async (req, res, next) => {
  try {
    const {nombreCompleto, nacionalidad,residencia, tiempoNuevoPais, imagen, especializacion} = req.body

    const response = await User.findByIdAndUpdate(req.payload._id, {
      nombreCompleto,
      nacionalidad,
      residencia,
      tiempoNuevoPais,
      especializacion,
      imagen
    }, {new: true} )

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
})

// GET "/api/usuarios" -> buscar todos los usuarios
router.get("/", async (req, res, next) => {
  try {
      const todosUsuarios = await User.find()
      res.status(200).json(todosUsuarios);
  } catch (error) {
      next(error)
  }
})

// GET "/api/usuarios/:tipoRol/rol" -> buscar usuarios con tipo rol (user, psicologo o usuario)
router.get("/:tipoRol/rol", async (req, res, next) => {
  try {
      const usuariosPorRol = await User.find({rol: req.params.tipoRol}).select( { contraseña: 0, email: 0} ) // no aparezca esta info
      res.status(200).json(usuariosPorRol)
  } catch (error) {
      next(error)
  }
})

// GET "/api/usuarios/:usuarioId/id" -> usuario pueda buscar detalles de otros usuarios
router.get("/:usuarioId/id", async (req, res, next) => {
  try {
      const buscarUsuarioId = await User.findById(req.params.usuarioId).select( { contraseña: 0, email: 0} ) // no aparezca esta info
      res.status(200).json(buscarUsuarioId)
      console.log(buscarUsuarioId)
  } catch (error) {
      console.log(error)
      next(error)
  }
})



// router.get("/admin", tokenValidation, adminValidation,(req, res, next) => {
//     console.log("Esta ruta solo es accesible para usuario logeados y de tipo admin")
//   })

module.exports = router