const User = require("../models/User.model");

const router = require("express").Router();

// GET "/usuarios" -> buscar todos los usuarios
router.get("/", async (req, res, next) => {
    try {
        const todosUsuarios = await User.find()
        res.status(200).json(todosUsuarios);
    } catch (error) {
        next(error)
    }
})

// GET "/usuarios/:tipoRol/rol" -> buscar usuarios con tipo rol (user, psicologo o usuario)
router.get("/:tipoRol/rol", async (req, res, next) => {
    try {
        const usuariosPorRol = await User.find({rol: req.params.tipoRol})
        res.status(200).json(usuariosPorRol)
    } catch (error) {
        next(error)
    }
})

// GET "/usuarios/:usuarioId/id" -> usuario pueda buscar detalles de otros usuarios
router.get("/:usuarioId/id", async (req, res, next) => {
    try {
        const buscarUsuarioId = await User.findById(req.params.usuarioId)
        res.status(200).json(buscarUsuarioId)
        console.log(buscarUsuarioId)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = router