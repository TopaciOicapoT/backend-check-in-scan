// ... Configuración previa de Express
require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { corsMiddleware, handlePreflight } = require('./middlewares/cors');
const app = express();
const server = http.createServer(app);

// Configuración de Express
app.use(handlePreflight);
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const prodcutsRoutes = require('./routes/products');

// Usar rutas
app.use('/products', prodcutsRoutes);




// Configuración de puerto
const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Bienvenido a la API check-in scan');
});
  
  server.listen(PORT, async () => {
        console.log(`El servidor está escuchando en el puerto ${PORT}`);
      });
      