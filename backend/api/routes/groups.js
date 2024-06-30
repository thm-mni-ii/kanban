const express = require(`express`);
const controller = require('./controller');
const groupService = require('/tsc_out/groupService') // tsc_out is a docker volume. the file will be provided by the type script builder

const router = express.Router({mergeParams: true});

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

 
const hasKey = (key,obj) => {
  return Object.keys(obj).includes(key);
}

const getIdsFromParams = (params, ...ids) => {
  let retVal = {}
  ids.forEach((id, idx, arr) => {
    const has = hasKey(id, params);
    if (has) {
      retVal[id] = parseInt(params[id]);
    } else {
      throw new Error(`${id} is not in params`);
    }
  });
  return retVal;
}


router
  .route(`/`)
  .get((req, res) => {
    try {
      const ids = getIdsFromParams(req.params, "cid");
      const groups = groupService.getGroupList(ids.cid);
      res.status(200).json(groups);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .post((req, res) => {
    const hasProp = bodyHasProperty(req, "postData");
    if(hasProp.successful) {
      try {
        const ids = getIdsFromParams(req.params, "cid")
        const groupDetails = groupService.createGroup(ids.cid, req.body.postData);
        res.status(200).send(groupDetails);
      } catch (err) {
        res.status(500).send(err.message);
      }
      
    } else {
      res.status(400).send(hasProp.failureMsg);
    }    
  });

router
  .route(`/:gid`)
  .get((req, res) => {
      try {
        const ids = getIdsFromParams(req. params, "cid", "gid")
        res.status(200).json(groupService.getGroup(ids.cid, ids.gid));
      } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .put((req, res) => {
    const hasProp = bodyHasProperty(req, "postData");
    
    if (hasProp.successful) {
      try {
        const ids = getIdsFromParams(req.params, "cid", "gid");
        res.status(200).json(groupService.updateGroup(ids.cid, ids.gid, req.body.postData));
      } catch (err) {
        res.status(500).send(err.message);
      }
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  })
  .delete((req, res) => {
    const hasProp = bodyHasProperty(req, "courseID");
    if (hasProp.successful) {
      try {
        const ids = getIdsFromParams(req.params, "cid", "gid");
        groupService.deleteGroup(ids.cid, ids.gid);
        res.status(200).send();
      } catch (err) {
        res.status(500).send(err.message);
      }
    } else {
      res.status(400).send(hasProp.failureMsg);
    }
  });

router
  .route(`/:gid/users`)
  .get((req, res) => {
      try {
        const ids = getIdsFromParams(req.params, "cid", "gid");
        const members = groupService.getGroupMembers(ids.cid, ids.gid);
        res.status(200).json({"members":members});
      } catch (err) {
        res.status(500).send(err.message);
      }
  })
  .delete((req, res) => {
    try {
      const ids = getIdsFromParams(req.params, "cid", "gid");
      groupService.removeAllUsersFromGroup(ids.cid, ids.gid);
      res.status(200).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  })

/**
 * Gets a specific user for a specific group
 */
router
  .route(`/:groupId/users/:uid`)
  .put((req, res) => {
    try {
      const ids = getIdsFromParams(req.params, "cid", "gid", "uid");
      const memberShipData = groupService.addUserToGroup(ids.cid, ids.gid, ids.uid);
      res.status(200).json(memberShipData);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .delete((req, res) => {
    try {
      const ids = getIdsFromParams(req.params, "cid", "gid", "uid");
      groupService.removeUserFromGroup(ids.cid, ids.gid, ids.uid);
      res.status(200).send();
    } catch (err) {
      res.status(500).send(err.message);
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