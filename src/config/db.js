const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'covid_tracker',
    },
    pool: {
        min: 0,
        max: 7
    }
});

module.exports = knex;