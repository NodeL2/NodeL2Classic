const SQL = require('like-sql'), builder = new SQL();

function characterFetchAll(username) {
    return this.execute(
        builder.select('characters', ['*'], 'username = ?', username)
    );
}

module.exports = characterFetchAll;
