const Product = require('./model');
const router = require('express').Router();
const productControllerV2 = require('./controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.post('/product', upload.single('image'), productControllerV2.store);
router.get('/product/:id', productControllerV2.detail);
router.get('/product', productControllerV2.getAll);
router.delete('/product/:id', productControllerV2._delete);
router.put('/product/:id', upload.single('image'), productControllerV2.update);

module.exports = router;
