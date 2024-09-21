const express = require('express');
const multer = require('multer');
const path = require('path');
const exceltable_controller = require('../controllers/etable');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original filename
    }
});
const upload = multer({ storage: storage });
router.post('/post/excel_data', upload.single('file'), exceltable_controller.uploadFile);
router.get('/get/excel_data', exceltable_controller.getExcelldata)
router.get('/get/excel_data/:id', exceltable_controller.updateExcelldata)
router.put('/edit/excel_data/:id', exceltable_controller.editExcelldata)
router.delete('/remove/:id', exceltable_controller.deleteExcelldata)
module.exports = router;
