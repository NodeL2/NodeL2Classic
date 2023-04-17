const Database = {
    init: (callback) => {
        const optn = options.default.Database;

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.databaseName

        }).then((instance) => {
            utils.infoSuccess('DB', 'connected');
            this.conn = instance;
            callback();

        }).catch(error => {
            utils.infoFail('DB', 'failed(%d) -> %s', error.errno, error.text);
        });
    },

    execute: (sql) => {
        return this.conn.query(sql[0], sql[1]);
    },

    // Authentication Server

    accountCreate     : invoke(path.databaseAuth + 'Accounts/Create'),
    accountPassword   : invoke(path.databaseAuth + 'Accounts/Password'),
    accountCharacters : invoke(path.databaseAuth + 'Accounts/Characters'),

    // Game Server

    characterFetchAll : invoke(path.databaseGame + 'Characters/FetchAll'),
    characterCreate   : invoke(path.databaseGame + 'Characters/Create'),
    characterDelete   : invoke(path.databaseGame + 'Characters/Delete'),

    skillFetchAll     : invoke(path.databaseGame + 'Skills/FetchAll'),
    skillCreate       : invoke(path.databaseGame + 'Skills/Create'),
    skillDeleteAll    : invoke(path.databaseGame + 'Skills/DeleteAll'),

    itemFetchAll      : invoke(path.databaseGame + 'Items/FetchAll'),
    itemCreate        : invoke(path.databaseGame + 'Items/Create'),
    itemDeleteAll     : invoke(path.databaseGame + 'Items/DeleteAll'),

    shortcutFetchAll  : invoke(path.databaseGame + 'Shortcuts/FetchAll'),
    shortcutCreate    : invoke(path.databaseGame + 'Shortcuts/Create'),
    shortcutDeleteAll : invoke(path.databaseGame + 'Shortcuts/DeleteAll'),
    shortcutDelete    : invoke(path.databaseGame + 'Shortcuts/Delete')
};

module.exports = Database;
