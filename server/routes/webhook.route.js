const express = require('express');
const bodyParser = require('body-parser');

const clerkWebHook = require('../controllers/webhook.controller');

const router = express.Router();

router.post(
  '/clerk',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebHook
);

module.exports = router;
