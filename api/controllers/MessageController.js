/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  markAsRead: function(req, res) {
    var messagesIds = req.param('messageIds');
    async.each(messagesIds, function(messageId, cb) {
      Message.findOne({
        id: messageId
      }).exec(function(err, message) {
        if (err) {
          return cb(err);
        }
        message.read = true;
        message.save();
        cb();
      });
    }, function(err) {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });

  },
  markAsNotRead: function(req, res) {
    var messagesIds = req.param('messageIds');
    async.each(messagesIds, function(messageId, cb) {
      Message.findOne({
        id: messageId
      }).exec(function(err, message) {
        if (err) {
          return cb(err);
        }
        message.read = false;
        message.save();
        cb();
      });
    }, function(err) {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  },
  deleteMessages: function(req, res) {
    var messageIds = req.param('messageIds');
    async.each(messageIds, function(messageId) {
      Message.destroy({
        id: messageId
      }).exec(function(err) {
        if (err) {return res.serverError(err);}
        return res.ok();
      });
    });
  },
  sendMessage: function(req, res) {
    Entity.findOne({
      id: req.param('senderId')
    }).exec(function(err, sender) {
      if (err) { return res.serverError(err); }
      if (!sender) {return res.serverError('sender not found');}
      Entity.findOne({
        id: req.param('receiverId')
      }).exec(function(err, receiver) {
        if (err) { return res.serverError(err); }
        if (!sender) {return res.serverError('receiver not found');}
        Message.create({
          description: req.param('message'),
          receiver: receiver,
          sender: sender,
          read: false
        }).exec(function(err, newMessage) {
          if (err) { return res.serverError(err); }
          if (!newMessage) { return res.serverError('Message could not be created'); }
          return res.created(newMessage);
        });
      });
    });
  },
  getMessages: function(req, res) {
      Entity.findOne({
        id: req.param('entityId')
      }).exec(function(err, receiver) {
        if (err) { return res.serverError(err); }
        if (!receiver) {return res.serverError('receiver not found');}
        Message.find({
          receiver: req.param('entityId')
        }).exec(function(err, messages) {
          if (err) { return res.serverError(err); }
          if (!messages) { return res.serverError('Messages not found'); }
          return res.ok(messages);
        });
      });
  }
};
