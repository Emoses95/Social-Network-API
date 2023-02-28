const router = require('express').Router();
const thoughtRoute = require('./api/thoughtRoute');
const userRoute = require('./api/userRoute');

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

module.exports = router;