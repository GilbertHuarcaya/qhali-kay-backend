const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('Qhalikay DB!');
});

module.exports = router;
