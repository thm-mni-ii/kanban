const pool = require('../db');

const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Routen für die Zeit-Erfassung

router.post('/', controller.createTimeTracking);

router.get('/', controller.getAllTimeEntries);

router.get('/:id', controller.getTimeEntryById);

// TODO:
router.get('/group/:id', controller.getTimeEntriesByGroup);

router.get('/group/:groupid/user/:userid', controller.getTimeEntriesByGroupUser);

router.get('/user/:id', controller.getTimeEntriesByUser);

router.put('/:id', controller.updateTimeEntry);

router.delete('/:id', controller.deleteTimeEntry);


module.exports = router;