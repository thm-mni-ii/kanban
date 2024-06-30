const express = require(`express`);
const controller = require('./controller');
const groupService = require('/tsc_out/groupService') // tsc_out is a docker volume. the file will be provided by the type script builder

const router = express.Router();

const bodyHasProperty = (req, ...requiredProperties) => {
  const keys = Object.keys(req.body);
  const missingProps = [];
  const missingValues = [];

  requiredProperties.forEach((prop, idx, arr) => {
    if (!keys.includes(prop)) {
      missingProps.push(prop);
    } else if (req.body[prop] === null || req.body[prop] === undefined) {
      missingValues.push(prop);
    }
  });

  let missingMsg = `Request body is missing the following properties: ${missingProps}. `;
  let valueMsg = `Following properties have no value: ${missingValues}. `;
  let msg = "Request failed: ";
  if(missingProps.length > 0)
    msg = msg.concat(missingMsg);
  if(missingValues.length > 0)
    msg = msg.concat(valueMsg);

  return {"successful": missingProps.length == 0 && missingValues.length == 0, "missingProps": missingProps, "missingValues":missingValues, "failureMsg":msg};
}

const tryToCall = (functionToCall, ...params) => {
  try {
    return {"status": 200, "response": functionToCall.apply(null, params)};
  } catch (err) {
    return {"status": 500, "response": err.message};
  }
}


router
  .route(`/`)
  .get((req, res) => {
    const hasProp = bodyHasProperty(req, "courseID");
    if (hasProp.successful) {
      res.status(200).json(groupService.getGroupList(req.body.courseID));
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  })
  .post((req, res) => {
    const hasProp = bodyHasProperty(req, "courseID", "postData");
    if(hasProp.successful) {
      try {
        const groupDetails = groupService.createGroup(req.body.courseID, req.body.postData);
        res.status(200).send(groupDetails);
      } catch (err) {
        res.status(500).send(err.message);
      }
      
    } else {
      res.status(400).send(hasProp.failureMsg);
    }

    
  });

router
  .route(`/:id`)
  .get((req, res) => {
    const gid = req.params.id
    const hasProp = bodyHasProperty(req, "courseID");
    
    if (hasProp.successful) {
      res.status(200).json(groupService.getGroup(req.body.courseID, gid));
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  })
  .put((req, res) => {
    const gid = req.params.gid;
    const hasProp = bodyHasProperty(req, "courseID", "data");
    
    if (hasProp.successful) {
      res.status(200).json(groupService.updateGroup(req.body.courseID, gid, req.body.data));
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  })
  .delete((req, res) => {
    const gid = req.params.gid;
    const hasProp = bodyHasProperty(req, "courseID");

    if (hasProp.successful) {
      groupService.deleteGroup(req.body.courseID, gid);
      res.status(200).send();
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  });

router
  .route(`/:groupId/users`)
  .get((req, res) => {
    const gid = req.params.gid;
    const hasProp = bodyHasProperty(req, "courseID");
    const members = groupService.getGroupMembers(req.body.courseID, gid);

    if (hasProp.successful) {
      res.status(200).json(members);
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  })
  .post((req, res) => {
    const gid = req.params.gid;
    const hasProp = bodyHasProperty(req, "courseID");

    if(hasProp.successful) {
      // remove all groupmembers from group
      groupService.removeAllUsersFromGroup(req.body.courseID, gid);
      
      // add all group members from reqest to this group
      for (let oneMember in members) {
        groupService.addUserToGroup(req.body.courseID, gid, oneMember);
      }

      res.status(200);
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  });

/**
 * Gets a specific user for a specific group
 */
router
  .route(`/:groupId/users:id`)
  .get((req, res) => {
    const gid = req.params.groupId;
    const userId = req.params.id;
    const hasProp = bodyHasProperty(req, "courseID");
    
    if(hasProp.successful) {
      let members = groupService.getGroupMembers(req.body.courseID, gid);
      let searchedMember = null;
      for (let member in members) {
        if (member.user.id == userId) {
          searchedMember = member;
          break;
        }
      }
      if (searchedMember == null) {
        res.status(400).send(`Group ${gid} in Course ${req.body.courseID} has no Member with id ${userId}.`);
      } else {
        res.status(200).json(searchedMember);
      }
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const gid = req.params.groupId;
    const uid = req.params.id;
    const hasProp = bodyHasProperty(req, "courseID");

    if(hasProp.successful) {
      try {
        groupService.removeUserFromGroup(req.body.courseID, gid, uid);
        res.status(200).send();
      } catch (e) {
        res.status(500).send(e.message);
      }
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
    
  });
router
  .route(`/:groupId/boards`)
  .get(controller.getBoardsByGroup)
  .post(controller.postBoardByGroup);

router
  .route(`/:groupId/boards/:id`)
  .get(controller.getSpecificBoardOfGroup)
  .put(controller.putSpecificBoardOfGroup)
  .delete(controller.deleteSpecificBoardOfGroup);
router
  .route(`/:groupId/boards/:boardId/cards`)
  .get(controller.getCardsOfBoardOfGroup)
  .post(controller.postCardToBoardOfGroup);

router
  .route(`/:groupId/boards/:boardId/cards:id`)
  .get(controller.getSpecificCardOfBoardOfGroup)
  .put(controller.putSpecificCardToBoardOfGroup)
  .delete(controller.deleteSpecificCardOfBoardOfGroup);

router
  .route(`/:groupId/boards/:boardId/labels`)
  .get(controller.getLabelsOfBoardOfGroup)
  .post(controller.postLabelToBoardOfGroup);

router.route(`/:groupId/boards/:boardId/labels:id`)
  .get(controller.getSpecificLabelOfBoardOfGroup)
  .put(controller.putSpecificLabelToBoardOfGroup)
  .delete(controller.deleteSpecificLabelOfBoardOfGroup)


module.exports = router