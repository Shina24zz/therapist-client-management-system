const express = require('express');
const router = express.Router();
const {
  getAllSessions,
  createSession,
  deleteSession
} = require('../controllers/sessionsController');

router.get('/', getAllSessions);
router.post('/', createSession);
router.delete('/:id', deleteSession);

module.exports = router;
