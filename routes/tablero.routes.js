const { tokenValidation } = require("../middlewares/auth.middlewares");
const Tablero = require("../models/Tablero.model");

const router = require("express").Router();

// POST "/api/tableros" -> crear un nuevo taller
router.post("/", tokenValidation, async (req, res, next) => {
  try {
    const { titulo, imagen, descripcion } = req.body;

    const response = await Tablero.create({
      titulo,
      imagen,
      descripcion,
      creador: req.payload._id,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/tableros/:tableroId" -> busca un tablero por su ID
router.get("/:tableroId", async (req, res, next) => {
  try {
    const tableroId = await Tablero.findById(req.params.tableroId);
    res.status(200).json(tableroId);
  } catch (error) {
    next(error);
  }
});

// GET "/api/tableros/:usuarioId" -> busca tablero del usuario por su ID
router.get(
  "/:usuarioId/por-usuario",
  tokenValidation,
  async (req, res, next) => {
    try {
      //queremos saber los tableros que ha creado un usuario especifico
      const tablerosDeUsuario = await Tablero.find({
        creador: req.params.usuarioId});
      res.status(200).json(tablerosDeUsuario);
    } catch (error) {
      next(error);
    }
  }
);

// PUT "/api/tableros/:tableroId" -> EDITAR tablero
router.put("/:tableroId", async (req, res, next) => {
  try {
    const { titulo, descripcion, imagen } = req.body;

    const response = await Tablero.findByIdAndUpdate(
      req.params.tableroId,
      {
        titulo,
        descripcion,
        imagen,
      },
      { new: true }
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/tableros/:tableroId" -> borra tablero
router.delete("/:tableroId", async (req, res, next) => {
  try {
    await Tablero.findByIdAndDelete(req.params.tableroId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
