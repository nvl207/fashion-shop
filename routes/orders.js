var express = require('express');
var router = express.Router();

const orders = require('../data/orders.json')


/* GET*/
router.get('/', function(req, res, next) {
  res.send(orders);
});


module.exports = router;
