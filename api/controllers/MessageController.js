/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  markAsRead: function(req, res) {
    var messagesIds = req.param('messageIds');
    async.each(messageIds, function(messageId, cb) {
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
    });
  },
  markAsNotRead: function(req, res) {
    var messagesIds = req.param('messageIds');
    async.each(messageIds, function(messageId, cb) {
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
    });
  },
  deleteMessages: function(req, res) {
    var messageIds = req.param('messageIds');
    async.each(messageIds, function(messageId) {
      Message.destroy({
        id: messageId
      }).exec(function(err) {
        if (err) {return res.serverError(err);}
      });
    });
  },
  sendMessage: function(req, res) {
    
  }
};
