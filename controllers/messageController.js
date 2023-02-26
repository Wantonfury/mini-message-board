const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  Message.find()
    .sort({ date: 1 })
    .exec((err, messages) => {
      if (err) return next(err);
      
      res.render('index', {
        title: 'Mini Message Board',
        messages
      });
    });
}

exports.message_create = [
  body('text', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('user', 'User must not be empty.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  (req, res, next) => {
    
  }
];