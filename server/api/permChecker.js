const { User } = require('../db/models')

//this is temporary for now, but until we have a list of allowed actions in the database, this will work as our hardcoded permissions
const permissions = {addEvent: ['1']}


function permChecker(req, res, next){
  console.log('user.id: ', req.session.passport.user)
  const action = req.body.action;
  console.log('action:', permissions[action]);

  User.findById(req.session.passport.user)
  .then(user => {
    console.log('admin status: ', user.adminStatus);
    if (permissions[action].indexOf(user.adminStatus) !== -1){
      console.log('approved!!');
      next();
    } else {
      console.log('denied!')
      res.status(403).send('Permission denied');
    }
  })
}

module.exports = permChecker;
