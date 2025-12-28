const express = require('express');
const router = express.Router();
const {
  uploadVideo,
  getVideos,
  getVideoById,
  streamVideo,
  deleteVideo
} = require('../controllers/videoController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../utilities/multerConfig');

// Protected Routes
router.post('/upload', protect, authorize('editor', 'admin'), upload.single('video'), uploadVideo);
router.get('/', protect, getVideos);
router.get('/:id', protect, getVideoById);
router.delete('/:id', protect, authorize('editor', 'admin'), deleteVideo);

// Stream Route (protected likely via query param handled in controller/middleware)
router.get('/stream/:id', protect, streamVideo);

module.exports = router;
