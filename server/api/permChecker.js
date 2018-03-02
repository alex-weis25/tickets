const { User } = require('../db/models')

function permChecker(req, res, next, action){
  if(req.session.passport){
    User.scope('showPermissions').findById(req.session.passport.user)
    .then(user => {
        if (user.permissions.filter(permission => permission.action !== action).length > 0){
          console.log('approved!!');
          next();
        } else {
          console.log('denied!')
          res.status(403).send('Permission denied');
        }
      })
  } else {
    res.status(403).send('Permission denied');
  }
}

module.exports = permChecker;
