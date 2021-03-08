const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('./auth');
const wa = require('../helpers/utils/wrapAsync');
const { getImmigrants, addImmigrant, updateImmigrant, deleteImmigrant, search, getDomains, getExcel , searchOG , getMembers, getEntityType, getDomainsMap} = require('../controllers/proxyController');
const { getAllAllowed, getAllowed, addAllowed, updateAllowed, deleteAllowed } = require('../controllers/controller');

router.get('/allowed', isAdmin, wa(getAllAllowed) );
router.get('/allowed/:id', isAdmin, wa(getAllowed) );
router.post('/allowed', isAdmin, wa(addAllowed) );
router.put('/allowed/:id', isAdmin, wa(updateAllowed) );
router.delete('/allowed/:id', isAdmin, wa(deleteAllowed) );

// proxy shit
router.get('/immigrant/', isAuth, wa(getImmigrants) );
router.get('/search/:username', wa(search));
router.get('/searchOG/:groupname', isAuth, wa(searchOG));
router.get('/getMembers/:groupid', isAuth, wa(getMembers));
router.get('/domains', isAuth, wa(getDomains));
router.get('/excel', isAuth, wa(getExcel));
router.get('/entityType', isAuth, wa(getEntityType));
router.get('/domainsMap', isAuth, wa(getDomainsMap));
router.post('/immigrant', isAuth, wa(addImmigrant) );
router.put('/immigrant/:id', isAuth, wa(updateImmigrant) );
router.delete('/immigrant', isAuth, wa(deleteImmigrant) );

module.exports = router;
