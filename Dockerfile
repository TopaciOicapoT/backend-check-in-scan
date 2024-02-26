# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al directorio de trabajo en el contenedor
COPY . .

# Expone el puerto en el que tu aplicación se ejecuta
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
