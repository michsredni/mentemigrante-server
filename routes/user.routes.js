const router = require("express").Router();


const {tokenValidation, adminValidation}= require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// GET "/api/user/propio" => que user puede ver su perfil
router.get("/propio", tokenValidation, async (req, res, next) => {

    console.log(req.payload)

    try {
    
        const response = await User.findById(req.payload._id)
        res.json(response)
    
      } catch (error) {
        console.log(error)
        next(error)
      }
    

})

// router.get("/admin", tokenValidation, adminValidation,(req, res, next) => {
//     console.log("Esta ruta solo es accesible para usuario logeados y de tipo admin")
//   })

module.exports = router