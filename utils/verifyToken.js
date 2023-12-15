const errorHandler = require("./error");
const jwt = require('jsonwebtoken')

let revokedTokens = [];

module.exports = {
  /* verifyToken: async (req, res , next) => {
    const token = req.cookies.token;

    if(!token) return next(errorHandler(401, "Unauthorized"))
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=> {
      if(err) return next(errorHandler(403,'Forbidden'))
      req.user = user; 
    next()
    })
  }, */


/*   verifyToken: async (req, res , next) => {
    const token = req.header('auth');
    if(!token) return next(errorHandler(401, "Unauthorized"))
    jwt.verify(token, process.env.token, (err,user)=> {
      if(err) return next(errorHandler(403,'Forbidden'))
      req.user = user; 
    next()
    })
  },
 */

  verifyToken: async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            message: "Token absent",
            success: false
        });
    }
    try {
        // Vérifiez si le jeton est révoqué
        if (revokedTokens.includes(token)) {
            return res.status(401).json({
                message: "Le jeton a été révoqué",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.token);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Accès non autorisé",
            success: false,
            error: err.message
        });
    }


}
}