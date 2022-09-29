const user = require('./user');
const note = require('./note');
const comment = require('./comment');

const modelList = [
    'user','note','comment'
]

module.exports = {
    modelDefines : {
        user, note, comment,
    },
    modelList
}