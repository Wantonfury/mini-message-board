const Message = require('../models/message');
const wsserver = require('../wsserver');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  Message.find()
    .sort({ date: -1 })
    .exec((err, messages) => {
      if (err) return next(err);
      
      let messages_formatted = [];
      messages.forEach(message => {
        messages_formatted.push({
          text: message.text,
          user: message.user,
          date: message.date_formatted
        });
      });
      
      res.send(messages_formatted);
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
    const errors = validationResult(req);
    
    const message = new Message({
      text: req.body.text,
      user: req.body.user,
      date: Date.now()
    });
    
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: 'Validation Error',
        errors: errors.array().map((err) => {
          return err.msg;
        })
      });
    }
    
    message.save(err => {
      if (err) return next(err);
      res.status(200).send();
      wsserver.getWss().clients.forEach((client) => client.send('new_message'));
    });
  }
];