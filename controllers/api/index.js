const router = require('express').Router();
const userRoutes = require('./userRoutes');
const weatherRoutes = require('./weatherRoutes');

router.use('/users', userRoutes);
router.use("/weather", weatherRoutes);

module.exports = router;

