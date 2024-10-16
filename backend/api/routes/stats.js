const express = require(`express`);
const controller = require('./controller');

const router = express.Router();

router.route(`/taskspergroup`).get(controller.getTasksPerGroup);

router.route(`/tasks/by/group/:goupId`).get(controller.getTasksDoneByGroup);

router.route(`/tasks/by/member/:goupId`).get(controller.getTasksPerMember);

router.route(`/tasks/done/in/percent`).get(controller.getTasksDoneByInPercent);

router.route(`/tasks/per/label`).get(controller.getTaskamountPerLabel);

router.route(`/tasks/by/member/:goupId`).get(controller.getMembersPerGroup);

router.route(`/latest/done/task`).get(controller.getLatestDoneTime);

router.route(`/tasks/by/member`).get(controller.getTasksDoneByDate);

module.exports = router