const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('./auth');
const wa = require('../helpers/utils/wrapAsync');
const { getImmigrants, addImmigrant, deleteImmigrant, search, getDomains,
getGardenersStats, getMigratedStats, getStatusesStats, getTotalMigratedStats } = require('../controllers/proxyController');
const { getAllAllowed, getAllowed, addAllowed, updateAllowed, deleteAllowed } = require('../controllers/controller');

router.get('/allowed', isAdmin, wa(getAllAllowed) );
router.get('/allowed/:id', isAdmin, wa(getAllowed) );
router.post('/allowed', isAdmin, wa(addAllowed) );
router.put('/allowed/:id', isAdmin, wa(updateAllowed) );
router.delete('/allowed/:id', isAdmin, wa(deleteAllowed) );

// proxy shit
router.get('/immigrant/', isAuth, wa(getImmigrants) );
router.get('/search/:name', isAuth, wa(search));
router.get('/domains', isAuth, wa(getDomains));
router.post('/immigrant', isAuth, wa(addImmigrant) );
router.delete('/immigrant', isAuth, wa(deleteImmigrant) );

router.get('/stats/gardeners', isAuth, wa(getGardenersStats));
router.get('/stats/statuses', isAuth, wa(getMigratedStats));
router.get('/stats/migrations', isAuth, wa(getStatusesStats));
router.get('/stats/totalMigrations', isAuth, wa(getTotalMigratedStats));

module.exports = router;
