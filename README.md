
## Pasos Iniciales
- Revisar el archivo ./init.sql comprobar o añadir todas las consultas a la base de datos para configurarla antes de acceder a ella.

- colocar en el array allowList dentro del archivo cors.js la url del sitio desde el que se harán las llamadas a la api si no esta.

- En consola dentro de la carpeta del proyecto:
    - docker compose build
    - docker compose up -D

- Para eliminarlo:
    - docker compose down

## Una vez iniciado

Headers dentro de las llamadas a la api

- Authorization: Bearer autenticacioncheck-in

## Funciones en rutas

Rutas:
    /products ->

       - getAllProducts, obtiene todos los productos, no necesita parámetros.
       - getProductsById, obtiene un producto por el id, el id se pasa por parámetro
       - insertProducts, crea un producto, se le pasa un json, ejemplo:
            {
                "title": "Pan multicereal",
                "description": "Pan elaborado con harina integral y cereales",
                "status": 1
            }


       - updateProduct, actualiza un objeto por su id, se le pasa un json con todos los datos incluidos el id, ejemplo:
            {
                "id": 5,
                "title": "Pan multicereal",
                "description": "Pan elaborado con harina integral y cereales",
                "status": 1
            }


       - deleteProduct, elimina un producto por su id, se le pasa el id por parámetros.
