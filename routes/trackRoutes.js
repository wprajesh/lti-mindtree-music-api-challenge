const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.post('/', trackController.createTrack);
router.get('/:isrc', trackController.getTrackByISRC);
router.get('/artist/:artistName', trackController.getTracksByArtist);

module.exports = router;