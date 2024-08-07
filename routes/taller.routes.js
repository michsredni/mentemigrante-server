const { psicoValidation } = require("../middlewares/auth.middlewares");
const Taller = require("../models/Taller.model");

const router = require("express").Router();

// POST "/api/talleres" -> crear un nuevo taller
router.post("/", psicoValidation, async (req, res, next) => {
    
    try {
        const {nombre, descripcion, duracion, imagen, creador, usuarios } = req.body

        const response = await Taller.create({
            nombre,
            descripcion,
            duracion,
            imagen,
            creador,
            usuarios
        })
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})

// GET "/api/talleres" -> buscar todos los talleres
router.get("/", async (req, res, next) => {
    try {
        const todosTalleres = await Taller.find()
        res.status(200).json(todosTalleres);
    } catch (error) {
        next(error)
    }
})

// GET "/talleres/:tallerId" -> buscar un taller por ID
router.get("/:tallerId", async (req, res, next) => {
    try {
        const buscarTallerId = await Taller.findById(req.params.tallerId)
        res.status(200).json(buscarTallerId)
    } catch (error) {
        next(error)
    }
})




module.exports = router