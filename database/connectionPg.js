const mysql = require('mariadb');
require('dotenv').config();

const pool = mysql.createPool({

  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});
const executeMariaDBQuery = async (query, params) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results, fields) => {
      if (error) {
        console.error('Error executing MariaDB query:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const isNum =(val)=>{
  return !isNaN(val)
}




const valuesToUpdateQuery=(data)=>{
  var values = [];
  for (const [key, value] of Object.entries(data)) {
    var cadena=(value==='') ? `${key}=null` : `${key}='${value}'`
    values.push(cadena);
  }
  return values.join();
}

const valuesToInsertQuery=(data)=>{
  const keys = Object.keys(data).join();
  const values = Object.values(data).join("','");
  return {
    keys:keys, values:`'${values}'`
  };
}
const valuesToInsertQueryNotSingleQuote = (data) => {
  const keys = Object.keys(data).join();
  const values = Object.values(data).map(value => String(value).replace(/'/g, '^')).join("','");
  return {
      keys: keys,
      values: `'${values}'`
  };
}

const limitOffset=async(filas,paginador)=>{
  const offset = parseInt(paginador)===0?0:await parseInt(paginador) * parseInt(filas);
  const limit = await parseInt(filas); 

  return {limit:limit,offset:offset}
}

const whereFromObj = (filters, isSubconsult = false) => {
  if(!filters || Object.keys(filters).length === 0) return 'WHERE 1=1';
  
  const keys = Object.keys(filters);
  const where = isSubconsult ? keys.map(key=>{
    filters[key]=String(filters[key]).replace(",",".")
    return `${(isNum(filters[key]))?`CAST("${key}" as TEXT) like '${String(filters[key])}%'`:`LOWER("${key}") like '%${String(filters[key]).toLowerCase()}%'`}`
  }) :
    keys.map(key => {
      filters[key]=String(filters[key]).replace(",",".")
    return `${key} ${(isNum(filters[key]) && (key != 'bc_id' && key != 'ref_bc'))?`='${filters[key]}'`:`ilike '%${filters[key]}%'`}`
  });
  const result = where.join(' and ');
  return (result.length>0)? `where ${result}`:'';
}


const orderbyFromObj=async(order,isSubconsult=false)=>{
 
  const keys = Object.keys(order);
  const orderby = isSubconsult ?
  keys.map(key=>{
    return `"${key}" ${order[key]}`
  }):
  keys.map(key=>{
    return `"${key}" ${order[key]}`
  })
  const result = orderby.join(' , ');
  return  (result.length>0)? `order by ${result}`:'';
}



const deleteEmptyValues=(data)=>{
 
  for(const res in data){
    (data[res]==='' || data[res] ===null || data[res]==='-1')?
    delete data[res]:''
  }
  return data;
}

module.exports = {
  executeMariaDBQuery,
  valuesToUpdateQuery,
  valuesToInsertQuery,
  limitOffset,
  whereFromObj,
  orderbyFromObj,
  deleteEmptyValues,
  valuesToInsertQueryNotSingleQuote,
  pool,
}
