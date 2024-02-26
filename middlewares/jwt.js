const jwt = require('jsonwebtoken');



exports.authenticateToken= async(req, res, next)=> {
    // Comprueba el encabezado
    const authHeader = req.headers['authorization'];
    const tokenNotSigned = authHeader && authHeader.split(' ')[1];
    // Si no es null crea la firma
    if (tokenNotSigned == null) {
        return res.sendStatus(401).json({error:"Sin autorización"}); // Unauthorized
    }

    const token = jwt.sign(tokenNotSigned, process.env.JWT_SECRET)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Si coinciden permite el acceso
        if (err) {
            return res.sendStatus(403).json(err); // Forbidden
        }
        next(); // Continuar con la siguiente ruta si el token es valido 
    });
}

