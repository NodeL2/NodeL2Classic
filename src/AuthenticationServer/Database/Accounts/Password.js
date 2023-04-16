const SQL = require('like-sql'), builder = new SQL();

function accountPassword(username) {
    return this.execute(
        builder.select('accounts', ['password'], 'username = ?', username)
    );
}

module.exports = accountPassword;
