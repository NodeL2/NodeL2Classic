require('./Global');

// User imports
const AuthSession = invoke('AuthenticationServer/Session');
const GameSession = invoke('GameServer/Session');
const Server      = invoke('Server');
const Database    = invoke('Database');

console.info('\n\
    + ==================================== \n\
    # Server Name: ......... NodeL2        \n\
    # Build Revision: ...... %s            \n\
    # Chronicle: ........... Classic [24]  \n\
    # Build date: .......... %s            \n\
    # NodeJS version: ...... %s            \n\
    + ==================================== \n\
', utils.buildNumber(), utils.currentDate(), utils.nodeVersion());

// Startup procedure, init `DataCache`, then `AuthServer` and `GameServer`
Database.init(() => {
    new Server('AuthServer', options.default.AuthServer, (name, socket) => {
        return new AuthSession(name, socket);
    });

    new Server('GameServer', options.default.GameServer, (name, socket) => {
        return new GameSession(name, socket);
    });
});
