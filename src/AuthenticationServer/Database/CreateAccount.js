const SQL = require('like-sql'), builder = new SQL();

function createAccount(username, password) {
    return this.execute(
        builder.insert('accounts', { username: username, password: password })
    );
}

module.exports = createAccount;
