const pool = require('../db');

const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Routen für die Zeit-Erfassung

router.post('/', controller.createTimeTracking);

router.get('/', controller.getAllTimeEntries);

router.get('/:id', controller.getTimeEntryById);

router.get('/group/:id', controller.getTimeEntriesByGroup);

router.get('/group/:groupid/user/:userid', controller.getTimeEntriesByGroupUser);

router.get('/user/:id', controller.getTimeEntriesByUser);

router.put('/:id', controller.updateTimeEntry);

router.delete('/:id', controller.deleteTimeEntry);

router.get('/task', controller.getAllTaskEntries);

router.get('/task/group/:groupid', controller.getTaskEntriesByGroup);

router.get('/task/user/:userid', controller.getTaskEntriesByUser);

router.get('/task/group/:groupid/user/:userid', controller.getTaskEntriesByGroupUser);

router.get('/task/time/:timeid', controller.getTaskEntriesByTime);

router.post('/task', controller.createTaskEntry);

router.delete('/task', controller.deleteTaskTrackingEntry);

// TODO: routes to get tasks and time entries by date

// TODO: test it

module.exports = router;