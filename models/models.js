
const {pool, valuesToUpdateQuery, valuesToInsertQuery, limitOffset, whereFromObj, orderbyFromObj,valuesToInsertQueryNotSingleQuote } = require('../database/connectionPg');

exports.insertProducts = async (data) => {
    try {
        const { keys, values } = await valuesToInsertQuery(data);
  
      const query = `INSERT INTO my_database.products (${keys}) VALUES (${values})`;
      const res = await pool.query(query);
      return res;
  
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  exports.getAllProducts = async () => {
    try {
      const query = `select * from my_database.products`;
      const res = await pool.query(query);
      return res;
  
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  exports.getLastProducts = async () => {
    try {
      const query = `SELECT *
      FROM my_database.products
      ORDER BY createdAt DESC
      LIMIT 1;
      
      `;
      const res = await pool.query(query);
      return res;
  
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  exports.getProductsById = async (id) => {
    try {
      const query = `select * from my_database.products WHERE id= ${id}`;
      const res = await pool.query(query);
      return res;
  
    } catch (error) {
      console.error(error);
     return error;
    }
  }

  exports.updateProduct = async (id, data) => {
    try {
        const values = await valuesToUpdateQuery(data);
        const query = `UPDATE my_database.products SET ${values} WHERE id='${id}'`;
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        return error;
    }
};


  exports.deleteProduct = async (id) => {
    try {
      const query = `DELETE FROM my_database.products WHERE id = '${id}';`;
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  };
