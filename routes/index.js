const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('404 Not Found');
});

module.exports = router;