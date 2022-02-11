const conn = require('../../config/mysql');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: 'SELECT * FROM products WHERE name LIKE ?',
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: 'SELECT * FROM products',
    };
  }
  conn.query(exec, _response(res));
};

const detail = (req, res) => {
  conn.query(
    {
      sql: 'SELECT * FROM products WHERE id=?',
      values: [req.params.id],
    },
    _response(res)
  );
};

const _delete = (req, res) => {
  conn.query(
    {
      sql: 'DELETE FROM products WHERE id=?',
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    conn.query(
      {
        sql: 'INSERT INTO products (name,price,stock,status,imageUrl) VALUES (?,?,?,?,?)',
        values: [
          name,
          price,
          stock,
          status,
          `http://localhost:3000/public/${image.originalname}`,
        ],
      },
      _response(res)
    );
  }
};

const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let exec = {};
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    exec = {
      sql: 'UPDATE products SET name=?,price=?,stock=?,status=?,imageUrl=? WHERE id=?',
      values: [
        name,
        price,
        stock,
        status,
        `http://localhost:3000/public/${image.originalname}`,
        req.params.id,
      ],
    };
  } else {
    exec = {
      sql: 'UPDATE products SET name=?,price=?,stock=?,status=? WHERE id=?',
      values: [name, price, stock, status, req.params.id],
    };
  }
  conn.query(exec, _response(res));
};

const _response = (res) => {
  return (error, results) => {
    if (error) {
      res.send({
        status: 'failed',
        response: error,
      });
    } else {
      res.send({
        status: 'success',
        response: results,
      });
    }
  };
};

module.exports = {
  index,
  detail,
  store,
  update,
  _delete,
};
