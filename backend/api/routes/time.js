const pool = require('../db');

const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Routen für die Zeit-Erfassung

router.post('/', controller.createTimeTracking);

router.get('/', controller.getAllTimeEntries);

router.get('/group/:id', controller.getTimeEntriesByGroup);

router.get('/group/:groupid/user/:userid', controller.getTimeEntriesByGroupUser);

router.get('/user/:id', controller.getTimeEntriesByUser);

router.get('/task', controller.getAllTaskEntries);

router.get('/task/user/:userid', controller.getTaskEntriesByUser);

router.get('/task/group/:groupid', controller.getTaskEntriesByGroup);

router.get('/task/group/:groupid/user/:userid', controller.getTaskEntriesByGroupUser);

router.post('/task', controller.createTaskEntry);

router.delete('/task', controller.deleteTaskTrackingEntry);

router.get('/:timeid/tasks', controller.getTaskEntriesByTime);

router.get('/:id', controller.getTimeEntryById); // must be below /task routes. otherwise the word task will be mistaken for the :id

router.put('/:id', controller.updateTimeEntry);

router.delete('/:id', controller.deleteTimeEntry);

module.exports = router;