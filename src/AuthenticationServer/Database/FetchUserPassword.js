const SQL = require('like-sql'), builder = new SQL();

function fetchUserPassword(username) {
    return this.execute(
        builder.select('accounts', ['password'], 'username = ?', username)
    );
}

module.exports = fetchUserPassword;
