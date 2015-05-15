var express = require('express');
var Bounty = require('./bounty-model');

var router = express.Router();
module.exports = exports = router;

router.get('/', function (req, res, next) {  
  Bounty.find({}, function (err, data) {
    res.render('list', {title: 'My Bounties', bounties: data});
  });
});

// get a specific bounty
router.get('/:id', function (req, res, next) {
  Bounty.find({_id: req.params.id}, function (err, data) {
    if (err) {
      res.error = err;
      next();
    }
    if (!data) {
      req.error = 'NOT FOUND';
      next();
    } else {
      res.json(data);
    }
  });
});

// add a new bounty
router.post('/', function (req, res, next) {
  var bounty = new Bounty(req.body);
  bounty.save( function (err, new_bounty) {
    if (err) {
      res.error = err;
      next();
    }
    res.json(new_bounty);
  });
});

// update a bounty
router.put('/:id', function (req, res, next) {
  Bounty.findOne({_id: req.params.id}, function (err, bounty) {
    if (err) {
      res.error = err;
      next();
    }
    if (!bounty) {
      req.error = 'NOT FOUND';
      next();
    } else {
      for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          bounty[key] = req.body[key];
        }
      }
      bounty.save( function (err, saved_bounty) {
        res.json(saved_bounty);
      });
    }
  });
});

// delete a bounty
router.get('/delete/:id', function (req, res, next) {
  Bounty.findOne({_id: req.params.id}, function (err, bounty) {
    if (err) {
      res.error = err;
      next();
    }
    if (bounty) {
      bounty.remove( function (err) {
        res.redirect("/bounty");
      });
    } else {
      req.error = 'NOT FOUND';
      next();
    }
  });
});