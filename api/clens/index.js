const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('Clens DB!');
});

module.exports = router;
