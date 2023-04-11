const SQL = require('like-sql'), builder = new SQL();

function fetchCharacters(username) {
    return this.execute(
        builder.select('characters', ['*'], 'username = ?', username)
    );
}

module.exports = fetchCharacters;
