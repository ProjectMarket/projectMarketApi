/**
 * EntityController
 *
 * @description :: Server-side logic for managing entities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  me: function(req, res) {
    res.send(req.entity);
  },
  getEntity: function(req, res) {
    Entity.findOne({
      id: req.param('entityId')
    }).populate('messages').populate('notifications').populate('projectsPosted').populate('projectsApplied').populate('moeForProjects').exec(function(err, entity) {
      if (err) {
        return res.serverError(err);
      }
      if (!entity) {
        return res.notFound('No entity found for this id');
      }

      var obj = entity.toJSON();

      if (obj.type == 'user') {
        User.findOne({
          id: obj.elementId
        }).exec(function(err, user) {
          if (!err && user) {
            obj.associatedElement = user.toJSON();
            delete obj.elementId;
            return res.ok(obj);
          }
        });
      } else if (obj.type == 'society') {
        Society.findOne({
          id: obj.elementId
        }).populate('skills').exec(function(err, society) {
          if (!err && society) {
            obj.associatedElement = society.toJSON();
            delete obj.elementId;
            return res.ok(obj);
          }
        });
      }
    });
  },
  updateProfile: function(req, res) {
    Entity.findOne({
      id: req.param('entityId')
    }).exec(function(err, entity) {
      if (err) {
        return res.serverError(err);
      }
      if (!entity) {
        return res.serverError('Entity not found');
      }

      if ((req.param('email') !== null && req.param('email') !== undefined && req.param('email') !== "") || ((req.param('description') !== null && req.param('description') !== undefined && req.param('description') !== ""))) {
        if (req.param('email') !== null && req.param('email') !== undefined && req.param('email') !== "") {
          entity.email = req.param('email');
        }

        if (req.param('description') !== null && req.param('description') !== undefined && req.param('description') !== "") {
          entity.description = req.param('description');
        }
      }

      entity.save(function(err) {
        if (err) {
          return res.serverError(err);
        }

        if (entity.type == 'user') {
          User.findOne({
            id: entity.elementId
          }).exec(function(err, user) {
            if ((req.param('firstname') !== null && req.param('firstname') !== undefined && req.param('firstname') !== "") || (req.param('lastname') !== null && req.param('lastname') !== undefined && req.param('lastname') !== "") || (req.param('avatar') !== null && req.param('avatar') !== undefined && req.param('avatar') !== "") || (req.param('address') !== null && req.param('address') !== undefined && req.param('address') !== "") || (req.param('postalcode') !== null && req.param('postalcode') !== undefined && req.param('postalcode') !== "") || (req.param('city') !== null && req.param('city') !== undefined && req.param('city') !== "") || (req.param('country') !== null && req.param('country') !== undefined && req.param('country') !== "")) {
              if (req.param('firstname') !== null && req.param('firstname') !== undefined && req.param('firstname') !== "") {
                user.firstname = req.param('firstname');
              }
              if (req.param('lastname') !== null && req.param('lastname') !== undefined && req.param('lastname') !== "") {
                user.lastname = req.param('lastname');
              }
              if (req.param('avatar') !== null && req.param('avatar') !== undefined && req.param('avatar') !== "") {
                user.avatar = req.param('avatar');
              }
              if (req.param('address') !== null && req.param('address') !== undefined && req.param('address') !== "") {
                user.address = req.param('address');
              }
              if (req.param('postalcode') !== null && req.param('postalcode') !== undefined && req.param('postalcode') !== "") {
                user.postalcode = req.param('postalcode');
              }
              if (req.param('city') !== null && req.param('city') !== undefined && req.param('city') !== "") {
                user.city = req.param('city');
              }
              if (req.param('country') !== null && req.param('country') !== undefined && req.param('country') !== "") {
                user.country = req.param('country');
              }
            }

            user.save(function(err) {
              if (err) {
                return res.serverError(err);
              }

              var obj = entity.toJSON();
              return res.ok(obj);
            });
          });
        } else if (entity.type == 'society') {
          Society.findOne({
            id: entity.elementId
          }).exec(function(err, society) {
            if ((req.param('legalname') !== null && req.param('legalname') !== undefined && req.param('legalname') !== "") || (req.param('siretnumber') !== null && req.param('siretnumber') !== undefined && req.param('siretnumber') !== "") || (req.param('avatar') !== null && req.param('avatar') !== undefined && req.param('avatar') !== "") || (req.param('address') !== null && req.param('address') !== undefined && req.param('address') !== "") || (req.param('postalcode') !== null && req.param('postalcode') !== undefined && req.param('postalcode') !== "") || (req.param('city') !== null && req.param('city') !== undefined && req.param('city') !== "") || (req.param('country') !== null && req.param('country') !== undefined && req.param('country') !== "") || (req.param('skills') !== null && req.param('skills') !== undefined && req.param('skills') !== "")) {
              if (req.param('legalname') !== null && req.param('legalname') !== undefined) {
                society.legalname = req.param('legalname');
              }
              if (req.param('siretnumber') !== null && req.param('siretnumber') !== undefined) {
                society.siretnumber = req.param('siretnumber');
              }
              if (req.param('avatar') !== null && req.param('avatar') !== undefined) {
                society.avatar = req.param('avatar');
              }
              if (req.param('address') !== null && req.param('address') !== undefined) {
                society.address = req.param('address');
              }
              if (req.param('postalcode') !== null && req.param('postalcode') !== undefined && req.param('postalcode') !== "") {
                society.postalcode = req.param('postalcode');
              }
              if (req.param('city') !== null && req.param('city') !== undefined && req.param('city') !== "") {
                society.city = req.param('city');
              }
              if (req.param('country') !== null && req.param('country') !== undefined && req.param('country') !== "") {
                society.country = req.param('country');
              }
              if (req.param('skills') !== null && req.param('skills') !== undefined && req.param('skills') !== "") {
                society.skills = [];
                for (var i = 0; i < req.param('skills').length; i++)
                {
                  society.skills.add(req.param('skills')[i]);
                }
              }
            }

            society.save(function(err) {
              if (err) {
                return res.serverError(err);
              }

              var obj = entity.toJSON();
              return res.ok(obj);
            });
          });
        }
      });
    });
  },
  updatePassword: function(req, res) {
    Entity.findOne({
      id: req.param('entityId')
    }).exec(function(err, entity) {
      if (err) {
        return res.serverError(err);
      }
      if (!entity) {
        return res.serverError('Entity not found');
      }

      if (SecurityService.comparePassword(req.param('oldpassword'), entity)) {
        entity.password = req.param('newpassword');
        SecurityService.hashPassword(entity);
        entity.save(function(err) {
          if (err) {
            return res.serverError(err);
          }

          var obj = entity.toJSON();

          return res.ok(obj);
        });
      } else {
        return res.serverError('Old password was wrong');
      }
    });
  },
  deleteEntity: function(req, res) {
    Entity.findOne({
      id: req.param('entityId')
    }).populate('projectsPosted').populate('moeForProjects').populate('projectsApplied').populate('messages').populate('notifications').populate('logs').populate('avis').exec(function(err, entity) {
      if (err) {
        return res.serverError(err);
      }
      if (!entity) {
        return res.serverError('Entity not found');
      }

      var object = entity.toJSON();

      var isOnStartedProject = false;

      async.each(object.moeForProjects, function(project, cb) {

        if (project.started !== null && project.over === null) {
          isOnStartedProject = true;
        }
        cb();

      }, function(err) {
        if (err) {
          return res.serverError(err);
        }

        if (isOnStartedProject) {
          res.unauthorized("moe project started");
        }

        var isMoaForStartedProjects = false;

        var projectsToDelete = [];

        async.each(object.projectsPosted, function(project, cb) {
          if (project.started !== null && project.over === null) {
            isMoaForStartedProjects = true;
          } else if (project.started === null) {
            projectsToDelete.push(project.id);
          }
          cb();
        }, function(err) {
          if (err) {
            return res.serverError(err);
          }

          if (isMoaForStartedProjects) {
            res.unauthorized("moa project started");
          }

          async.each(projectsToDelete, function(projectId, cb) {
            Project.destroy({
              id: projectId
            }).exec(function(err) {
              if (err) {
                return res.serverError(err);
              }

              cb();
            });
          }, function(err) {
            if (err) {
              return res.serverError(err);
            }

            var projects = [];

            async.each(object.projectsApplied, function(project, cb) {
              projects.push(project.id);
              cb();
            }, function(err) {
              if (err) {
                return res.serverError(err);
              }

              async.each(projects, function(idP, cb) {
                Project.findOne({
                  id: idP
                }).populate('appliants').exec(function(err, project) {
                  if (err) {
                    return res.serverError(err);
                  }

                  project.appliants.remove(entity.id);
                  project.save();
                  cb();
                });
              }, function(err) {
                if (err) {
                  return res.serverError(err);
                }

                async.each(entity.messages, function(message, cb) {
                  Message.destroy({
                    id: message.id
                  }).exec(function(err) {
                    if (err) {
                      return res.serverError(err);
                    }

                    cb();
                  });
                }, function(err) {
                  if (err) {
                    return res.serverError(err);
                  }

                  async.each(entity.notifications, function(notification, cb) {
                    Notification.destroy({
                      id: notification.id
                    }).exec(function(err) {
                      if (err) {
                        return res.serverError(err);
                      }

                      cb();
                    });
                  }, function(err) {
                    if (err) {
                      return res.serverError(err);
                    }

                    async.each(entity.logs, function(log, cb) {
                      Log.destroy({
                        id: log.id
                      }).exec(function(err) {
                        if (err) {
                          return res.serverError(err);
                        }

                        cb();
                      });
                    }, function(err) {
                      if (err) {
                        return res.serverError(err);
                      }

                      async.each(entity.avis, function(avis, cb) {
                        Commentary.destroy({
                          id: avis.id
                        }).exec(function(err) {
                          if (err) {
                            return res.serverError(err);
                          }

                          cb();
                        });
                      }, function(err) {
                        if (err) {
                          return res.serverError(err);
                        }

                        //TODO Handle images destroy
                        if (object.type == 'user') {
                          User.destroy({
                            id: object.elementId
                          }).exec(function(err) {
                            if (err) {
                              return res.serverError(err);
                            }

                            Entity.destroy({
                              id: req.param('entityId')
                            }).exec(function(err) {
                              if (err) {
                                return res.serverError(err);
                              }

                              return res.ok(entity);
                            });
                          });
                        } else if (object.type == 'society') {
                          Society.destroy({
                            id: object.elementId
                          }).exec(function(err) {
                            if (err) {
                              return res.serverError(err);
                            }

                            Entity.destroy({
                              id: req.param('entityId')
                            }).exec(function(err) {
                              if (err) {
                                return res.serverError(err);
                              }

                              return res.ok(entity);
                            });
                          });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
};
