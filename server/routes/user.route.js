const express = require('express');

const router = express.Router();

router.get('/anothertest', (req, res) => {
  res.status(200).send('User route');
});

module.exports = router;
