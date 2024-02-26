const Products = require('../core/product.class');
const logger = require('../config/logger');

exports.getAllProducts = async (req, res)=>{
    try {
        const products = await new Products().getAllProducts()
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        logger.error(error)
        res.status(500).json(error);
    }
}

    exports.getProductsById = async (req, res)=>{
        try {
            const data = req.params
            const products = await await new Products(data).getProductsById();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            logger.error(error)
            res.status(500).json(error);
        }
    }
    exports.insertProducts = async (req, res)=>{
    try {
        const data = req.body
        const insertProducts =  await new Products(data).insertProducts()
        const product = await new Products().getLastProducts()
        logger.info('Productos creado correctamente.');
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        logger.error(error)
        res.status(500).json(error);
    }
}
exports.updateProduct = async (req, res)=>{
    try {
        const data = req.body
        const products = await await new Products(data).updateProduct()
        logger.info('Producto actualizado correctamente.');
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        logger.error(error)
        res.status(500).json(error);
    }
}
exports.deleteProduct = async (req, res)=>{
    try {
        const data = req.params
        const products = await await new Products(data).deleteProduct()
        logger.info('Producto eliminado correctamente.');
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        logger.error(error)
        res.status(500).json(error);
    }
}