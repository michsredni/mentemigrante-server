const { psicoValidation, tokenValidation } = require("../middlewares/auth.middlewares");
const Taller = require("../models/Taller.model");

const router = require("express").Router();

// POST "/api/talleres" -> crear un nuevo taller
router.post("/", tokenValidation, psicoValidation, async (req, res, next) => { 
    // tokenValidation: valida y decifra el token para tener el payload. psicoValidation: valida el rol en el payload
    console.log(req);
    try {
        const {nombre, descripcion, duracion, imagen, usuarios } = req.body
        const response = await Taller.create({
            nombre,
            descripcion,
            duracion,
            imagen,
            creador: req.payload._id,
            usuarios,
        })
        res.status(200).json(response)
               
    } catch (error) {
        next(error)
    }
})

// GET "/api/talleres" -> buscar todos los talleres
router.get("/", async (req, res, next) => {
    try {
        const todosTalleres = await Taller.find().populate("usuarios").populate("creador")
        res.status(200).json(todosTalleres);
    } catch (error) {
        next(error)
    }
})

// GET "/api/talleres/:tallerId" -> buscar un taller por ID
router.get("/:tallerId", async (req, res, next) => {
    try {
        const buscarTallerId = await Taller.findById(req.params.tallerId).populate("usuarios")
        res.status(200).json(buscarTallerId)
    } catch (error) {
        next(error)
    }
})

// GET "/api/talleres/:usuarioId/id" -> busca talleres del psicologo (creador) por su ID
router.get("/:usuarioId/id", tokenValidation, async (req, res, next) => {
    try {
        const talleresDePsico = await Taller.find({creador: req.params.usuarioId})
        res.status(200).json(talleresDePsico)
    } catch (error) {
        next(error)
    }
})

// PUT "/api/talleres/:tallerId" -> actualiza los detalles de un taller
router.put("/:tallerId", async (req, res, next) => {
    try {
        const {nombre, descripcion, duracion, imagen, creador, usuarios } = req.body

        const response = await Taller.findByIdAndUpdate(req.params.tallerId, {
            nombre,
            descripcion,
            duracion,
            imagen,
            creador,
            usuarios
        }, { new: true })

        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
})

// PATCH "/api/talleres/:tallerId/duracion" -> actualiza el valor de duración
router.patch("/:tallerId/duracion", async (req, res, next) => {
    try {
        await Taller.findByIdAndUpdate(req.params.tallerId, {duracion: req.body.duracion},{new: true})
        
        res.sendStatus(204)
        
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/talleres/:tallerId/asistencia" -> usuario se apunta al taller
router.patch("/:tallerId/asistencia", tokenValidation, async (req, res, next) => {
    try {
        if(req.payload.rol === "user"){
            const response = await Taller.findByIdAndUpdate(req.params.tallerId, { $addToSet: {usuarios: req.payload._id}}, {new: true})
            res.sendStatus(204)

            const responsePopulate = await Taller.findById(response._id).populate("usuarios")
            res.sendStatus(204)
        } else{
            res.status(401).json({errorMessage: "eres psicólogo, no puedes registrarte al taller"})
        }
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/talleres/:tallerId/remover-asistencia" -> usuario se quita del taller
router.patch("/:tallerId/remover-asistencia", tokenValidation, async (req, res, next) => {
    try {
        await Taller.findByIdAndUpdate(req.params.tallerId, { $pull: {usuarios: req.payload._id}}, {new: true})
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/talleres/:tallerId" -> borra un taller
router.delete("/:tallerId", async (req, res, next) => {
    try {
        await Taller.findByIdAndDelete(req.params.tallerId)
        res.sendStatus(202)
    } catch (error) {
        next(error)
    }
})


module.exports = router