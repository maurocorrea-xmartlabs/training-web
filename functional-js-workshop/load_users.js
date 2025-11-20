function loadUsers(userIds, load, done) {
      var users = [];
      for (var i = 0; i < userIds.length; i++) {
        load(userIds[i], function(user){
            users[i] = user;
            if(users.length == userIds.length){
                done(users);
            }
        })
      }
    }
    
    module.exports = loadUsers;
