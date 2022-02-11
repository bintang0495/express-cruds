const Product = require('./model');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  try {
    if (image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        imageUrl: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const { search } = req.query;
    let result = await Product.findAll();
    if (search) {
      result = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    }
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const _delete = async (req, res) => {
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const detail = async (req, res) => {
  try {
    const result = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const update = async (req, res) => {
  const image = req.file;
  let result;
  try {
    if (image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);
      result = await Product.update(
        {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          status: req.body.status,
          imageUrl: `http://localhost:3000/public/${image.originalname}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    } else {
      result = await Product.update(
        {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    }
    res.send({
      status: 'success',
      response: `data berhasil di update`,
    });
  } catch (error) {
    res.send({
      status: 'failed',
      response: error,
    });
  }
};

module.exports = {
  store,
  getAll,
  detail,
  _delete,
  update,
};
