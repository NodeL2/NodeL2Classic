const QualifiedUsers = {
    table: utils.tuple(),

    insert(username, secret) {
        if (QualifiedUsers.find(username, secret)) {
            return;
        }

        QualifiedUsers.table.push({ username: username, secret: secret });

        setTimeout(() => {
            QualifiedUsers.remove(username);
        }, 10000);
    },

    remove(username) {
        QualifiedUsers.table = QualifiedUsers.table.filter((ob) => username !== ob.username);
    },

    find(username, secret) {
        return QualifiedUsers.table.find((ob) => username === ob.username && secret === ob.secret);
    }
};

module.exports = QualifiedUsers;
