const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("/user", userRouter)

const usuarioRouter = require("./usuario.routes")
router.use("/usuarios", usuarioRouter)

module.exports = router;