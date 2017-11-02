/**
 * Created by Yoana on 9/12/2017.
 */
var mysql = require('mysql')
    , async = require('async')

// mysql://b5be55e5b20b7f:e5f589ee@us-cdbr-iron-east-05.cleardb.net/heroku_1ed23376d98b2e2?reconnect=true

var PRODUCTION_DB = 'heroku_1ed23376d98b2e2'
    , TEST_DB = 'novipel'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
    pool: null,
    mode: null,
}

// exports.connect = function(mode, done) {
//     console.log(" inside connect method ");
//     state.pool = mysql.createPool({
//         host: 'us-cdbr-iron-east-05.cleardb.net',
//         user: 'b5be55e5b20b7f',
//         password: 'e5f589ee',
//         database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
//     })
//     state.mode = mode
//     done()
// }

//
// exports.connect = function(mode, done) {
//     console.log(" inside connect method ");
//     state.pool = mysql.createPool({
//         host: '46.101.251.32',
//         user: 'root',
//         password: 'root',
//         database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
//     })
//     state.mode = mode
//     done()
// }

//LOCAL
exports.connect = function(mode, done) {
    console.log(" inside connect method ");
    state.pool = mysql.createPool({
        host: '172.17.0.1',
        user: 'root',
        password: 'root',
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    })
    state.mode = mode
    done()
}



// exports.connect = function(done) {
//     state.pool = mysql.createPool({
//         host: 'database:3306'
//     })
//
//     state.mode = mode
//     done()
// }


// exports.connect = function(mode, done) {
//     console.log(" inside connect method ");
//     state.pool = mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
//     })
//     state.mode = mode
//     done()
// }




exports.get = function() {
    return state.pool
}

exports.fixtures = function(data) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    var names = Object.keys(data.tables)
    async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
            var keys = Object.keys(row)
                , values = keys.map(function(key) { return "'" + row[key] + "'" })

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
}

exports.drop = function(tables, done) {
    var pool = state.pool
    if (!pool) return done(new Error('Missing database connection.'))

    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
}