'use strict'

function checkUsersValid(goodUsers){
    return function allUsersValid(submittedUsers){
        return submittedUsers.every((user) => (goodUsers.some((u) => user.id === u.id)));
    }
}

module.exports = checkUsersValid;