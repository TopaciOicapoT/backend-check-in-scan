const express = require('express');
const controllers = require('../controllers/controllers');
const controlToken = require('../middlewares/jwt');


const router = express.Router();
router.get('/findall',controlToken.authenticateToken,controllers.getAllProducts)
router.get('/findbyid/:id',controlToken.authenticateToken,controllers.getProductsById)
router.post('/created',controlToken.authenticateToken,controllers.insertProducts)
router.put('/update',controlToken.authenticateToken,controllers.updateProduct)
router.delete('/delete/:id',controlToken.authenticateToken,controllers.deleteProduct)


module.exports = router;