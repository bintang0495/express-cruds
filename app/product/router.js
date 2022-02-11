const express = require('express');
const router = express.Router();
const productController = require('./controller');

const multer = require('multer');
const upload = multer({ dest: '../../uploads' });

router.get('/product', productController.index);

router.get('/product/:id', productController.detail);

router.post('/product', upload.single('image'), productController.store);

router.put('/product/:id', upload.single('image'), productController.update);

router.delete('/product/:id', productController._delete);

// router.post('/product', upload.single('image'), (req, res) => {
//   console.log(req.body);
//   res.send(req.file);
// });

module.exports = router;
