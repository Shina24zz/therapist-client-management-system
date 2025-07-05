const express = require('express');
const router = express.Router();
const {
  getAllTherapists,
  createTherapist,
  deleteTherapist
} = require('../controllers/therapistsController');

router.get('/', getAllTherapists);
router.post('/', createTherapist);
router.delete('/:id', deleteTherapist);

module.exports = router;
