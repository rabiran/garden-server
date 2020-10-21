const express = require('express');
const wa =require('../helpers/utils/wrapAsync');
const {newUser,getUsers} = require('../Controller/apicontroller');
const router = express.Router();


// Home page route.
router.get('/users', wa(getUsers));

// About page route.
router.post('/user', wa(newUser));

module.exports = router;