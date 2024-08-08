const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const usuarioRouter = require("./user.routes")
router.use("/usuarios", usuarioRouter)

const tallerRouter = require("./taller.routes")
router.use("/talleres", tallerRouter)

const tableroRouter = require("./tablero.routes")
router.use("/tableros", tableroRouter)

module.exports = router;
