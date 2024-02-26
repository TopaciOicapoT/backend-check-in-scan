
const cors = require('cors');

const allowList = [
  'http://localhost:8000',
  'http://localhost:5000',
  'http://localhost:4000',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5174',
  'http://localhost:62599',
  '77.230.233.191',
  '188.26.222.76',
  '34.251.102.47',
  '54.171.47.12',
  '54.195.25.193',
  '54.246.162.233',
  '18.200.46.125',
  'https://web.postman.co',
]

let corsOptions;

const corsOptionsDelegate = function (req, callback) {
  //console.log('req.header("Origin")', req.header('Origin'));
  const myIpAddress = req.connection.remoteAddress;
  // console.log('allowList.indexOf(req.header("Origin"))', allowList.indexOf(req.header('Origin')));
  if (allowList.indexOf(req.header('Origin')) !== -1 || allowList.indexOf(myIpAddress) !== -1) {
    corsOptions = {
      origin: '*', // Reemplaza '*' con un dominio específico o un array de dominios permitidos.
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'], // Establece los métodos HTTP permitidos.
      allowedHeaders: ['Content-Type', 'Authorization','iduserlogin'], // Establece las cabeceras permitidas.
      optionsSuccessStatus: 200, // Respuesta de éxito para las solicitudes de OPTIONS.
      credentials: true, // Permite el uso de cookies en las solicitudes.
    }
  } else {
    corsOptions = { origin: false } // Rechaza la solicitud.
  }
  callback(null, corsOptions) // callback de error primero.
}

// Middleware personalizado para manejar las solicitudes OPTIONS
const handlePreflight = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    cors(corsOptionsDelegate)(req, res, next);
  } else {
    next();
  }
};

const corsMiddleware = cors(corsOptionsDelegate);


module.exports = { corsMiddleware: corsMiddleware, handlePreflight };