const express = require('express');
const router = express.Router();
const {
  getAllClients,
  createClient,
  deleteClient
} = require('../controllers/clientsController');

router.get('/', getAllClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);

module.exports = router;
