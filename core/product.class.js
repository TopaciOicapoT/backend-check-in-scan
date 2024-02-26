const db = require("../models/models");
let privated = new WeakMap();
const crypto = require("crypto");

// En esta clase están las funciones que usaremos en el controlador, en el constructor revisamos que los capos pasados por el controlador sean los que esperamos, en caso de que no coincidan serán eliminados.
class Product {
  constructor(values) {
    if (values) {
      privated.set(this, {
        id: values.id,
        title: values.title,
        description: values.description,
        status: values.status,
        createdAt: values.createdAt
      });
      Object.entries(privated.get(this)).forEach(([key, value]) =>
        value == undefined ? delete privated.get(this)[key] : ""
      );
    }

  }


  async insertProducts() {
    try {
      return await db.insertProducts(privated.get(this));
    } catch (error) {
      throw error;
    }
  }
  async getAllProducts() {
    try {
      return await db.getAllProducts();
    } catch (error) {
      throw error;
    }
  }
  async getProductsById() {
    try {
      return await db.getProductsById(privated.get(this)["id"]);
    } catch (error) {
      throw error;
    }
  }
  async getLastProducts() {
    try {
      return await db.getLastProducts();
    } catch (error) {
      throw error;
    }
  }
  async updateProduct() {
    try {
      let id=privated.get(this)["id"];
      delete privated.get(this)["id"]
      return await db.updateProduct(id, privated.get(this));
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct() {
    try {
      return await db.deleteProduct(privated.get(this)["id"]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
