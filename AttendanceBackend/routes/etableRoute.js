const express = require('express');
const multer = require('multer');
const path = require('path');
const exceltable_controller = require('../controllers/etable');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to original filename
    }
});
const upload = multer({ storage: storage });
router.post('/post/excel_data', upload.single('file'), exceltable_controller.uploadFile);
router.get('/get/excel_data', exceltable_controller.getExcelldata)
router.get('/get/excel_data/:id', exceltable_controller.updateExcelldata)
router.put('/post/excel_data/:id', exceltable_controller.editExcelldata)
router.delete('/remove/:id', exceltable_controller.deleteExcelldata)
module.exports = router;
