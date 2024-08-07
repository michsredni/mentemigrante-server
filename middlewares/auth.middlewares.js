const jwt = require("jsonwebtoken")

function tokenValidation(req, res, next) {
  try {
    const tokenArr = req.headers.authorization.split(" ")
     //console.log(tokenArr)
    const token = tokenArr[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
   

    // pasar a la proxima ruta la información del usuario logeado
    req.payload = payload

    next() 
  } catch (error) {
    res.status(401).json({errorMessage: "Token no existe o no es valido"})
  }
}

function adminValidation (req, res, next){
  if(req.payload.rol === "admin") {
    next()
  } else{
res.status(401).json({errorMessage: "no eres admin, no puedes acceder"})
  }
}

function psicoValidation (req, res, next){
  if(req.payload.rol === "psicologo") {
    next()
  } else{
res.status(401).json({errorMessage: "no eres psicologo, no puedes acceder"})
}
}

module.exports = {tokenValidation, adminValidation, psicoValidation}