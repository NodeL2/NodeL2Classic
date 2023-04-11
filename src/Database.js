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
            Database.conn = instance;
            callback();

        }).catch(error => {
            utils.infoFail('DB', 'failed(%d) -> %s', error.errno, error.text);
        });
    },

    execute: (sql) => {
        return Database.conn.query(sql[0], sql[1]);
    },

    // Authentication Server

    createAccount      : invoke(path.databaseAuth + 'CreateAccount'),
    fetchUserPassword  : invoke(path.databaseAuth + 'FetchUserPassword'),
    fetchAllCharacters : invoke(path.databaseAuth + 'FetchAllCharacters'),

    // Game Server

    createCharacter    : invoke(path.databaseGame + 'CreateCharacter')
};

module.exports = Database;
