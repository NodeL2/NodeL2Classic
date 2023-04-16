const SQL = require('like-sql'), builder = new SQL();

function accountCharacters() {
    return this.execute(
        builder.select('characters', ['*']) // TODO: Check if ['*'] is optional
    );
}

module.exports = accountCharacters;
