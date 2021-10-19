const express = require('express');
const router = express.Router();
const config = require('../../config');

/**
 * Get Server status
 * @route GET /
 * @group Health
 * @returns {object} 200 - Server is Up and Running
 * @returns {Error}  default - Unexpected error
 */
router.get('/', (req, res) => {
  res.json({
    title: config.appName,
    environment: `${config.env} server is up and running!`
  });
});

module.exports = router;