const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/pdf': 'pdf',
};

const config = {
  storage: multer.diskStorage({
    destination(req, file, callback) {
      console.log(req.files);
      if (req.files.length > 4) {
        return callback({ errorMessage: 'Length is more than 5' }, false);
      }
      return callback(null, 'media/product-images');
    },
    filename(req, file, callback) {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      return callback(null, `${new Date().toISOString()}-${name}.${extension}`);
    },
  }),
  fileFilter(req, file, callback) {
    if (!file) {
      return callback();
    }
    const image = file.mimetype.startsWith('image');
    if (image) {
      return callback(null, true);
    }
    if (req.files.length > 2) {
      return callback(null, false);
    }
    return callback({ message: 'file type not supported' }, false);
  },
};

module.exports = multer(config).array('productImage');
