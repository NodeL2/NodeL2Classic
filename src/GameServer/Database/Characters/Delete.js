const SQL = require('like-sql'), builder = new SQL();

function characterDelete(username, name) {
    return this.execute(
        builder.delete('characters', 'username = ? AND name = ?', username, name)
    );
}

module.exports = characterDelete;
