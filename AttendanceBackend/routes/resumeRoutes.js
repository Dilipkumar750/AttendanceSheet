//! this route is - from next js project user resume upload

const express = require('express');
const { uploadResume,getAllResume } = require('../controllers/resumeController');
const { resumeFileStorage } = require('../config/storage');
const router = express.Router();
const multer = require('multer');
const { getResumeView } = require('../controllers/resumeFetchController');
const uploads = multer({ storage:resumeFileStorage });


router.post('/upload', uploads.single('file'),uploadResume)
router.get('/get_all',getAllResume)
router.get('/get_view_resume/:fileId',getResumeView)

module.exports = router