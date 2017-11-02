/**
 * Created by Yoana on 9/12/2017.
 */

var db = require('./db.js')
    , async = require('async');



exports.create =  function(title , description , date , img , link,  done) {
    var values = [title, description, date, img , link]

    db.get().query('INSERT INTO stories ( title, description, date_entry, ImgLink , Link) VALUES(?, ? , ? , ? , ?)', values, function(err, result) {
        if (err) return done(err)
        console.log('the returning value ',result);
        //  return result.insertId;
        done(null, result.insertId)
    })
}





// exports.update =  function(id,title,description,img,link, done) {
//
//     var values = [ title, description, img , link ,id]
//
//     db.get().query('UPDATE stories SET  title = ? , description = ? , Img = ? ,  link = ? WHERE Id = ? VALUES(?, ? , ? , ? , ?)' ,values, function(err, result) {
//         if (err) return done(err)
//         console.log('the returning value ',result);
//         //  return result.insertId;
//         done(null, result)
//     })
// }


exports.update =  function(id,title,description,img,link, done) {

    var values = [ title, description, img , link ,id]

    db.get().query('UPDATE stories SET  title = ? , description = ? , Img = ? ,  Link = ? WHERE Id = ? ' ,[values.title, values.description,values.img,values.link,values.id], function(err, result) {
        if (err) return done(err)
        console.log('the returning value ',result);
        //  return result.insertId;
        done(null, result)
    })
}

// exports.updatePart =  function(body, done) {
//
//    console.log("the whole body ",body)
//
//     db.get().query('UPDATE stories SET  title = ? , description = ? , Img = ? ,  Link = ? WHERE Id = ? ' ,[body.title, body.description,body.img,body.link,body.id], function(err, result) {
//         if (err) return done(err)
//         console.log('the returning value ',result);
//         //  return result.insertId;
//         done(null, result)
//     })
// }

// exports.update2 =  function(id,title,description,img,link, done) {
//
//     //console.log("the whole body ",body)
//     db.get().query('UPDATE stories SET title = ? , description = ? , Img = ? ,  Link = ? WHERE Id = ? ' , title, description ,img ,link, id, function(err, result) {
//         if (err) return done(err)
//         console.log('the returning value ',result);
//         //  return result.insertId;
//         done(null, result)
//     })
// }


exports.update2 =  function(id, title, description, Img, Link, done) {
    //console.log("the whole body ",body)
    db.get().query('UPDATE stories SET title = ?, description = ? , Img = ? ,  Link = ? WHERE Id = ? ' , [title,description,Img,Link, id], function(err, result) {
        if (err) return done(err)
        console.log('the returning value ',result);
        //  return result.insertId;
        done(null, result)
    })
}


exports.getById =  function(storyId ,done) {
    console.log("the rows are ",storyId);
    db.get().query('SELECT * FROM stories WHERE Id = ?', storyId, function(err, rows) {
        console.log("the error is ",err);
        if (err) return done(err)
        //console.log('the returning value ',result);
        //  return result.insertId;
        console.log("the rows are ",rows);
        done(null, rows)
    })
}

exports.getUserByName =  function(name ,done) {

    var value = name
    db.get().query('SELECT * FROM user WHERE name = ?', value, function(err, rows) {
        if (err) return done(err)
        console.log('the returning value ',rows);
        //  return result.insertId;
        done(null, rows)
    })
}

exports.getAll = function(done) {
    db.get().query('SELECT * FROM stories', function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.getAllUsers = function(done) {
    db.get().query('SELECT * FROM user', function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.deleteById = function(storyId,done) {
    //console.log("THE ID INSIDE DELETE ",storyId);
    db.get().query('DELETE  FROM stories WHERE Id = ?', storyId, function (err, rows) {
        if (err) return done(err)
        //console.log("THE DELETED ROWS INFO ",rows);
        done(null, rows)
    })
}

// exports.create = async function(name,origin) {
//     var values = [name, origin]
//     return new Promise((resolve) => {
//             db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values, function (err, result) {
//             if (err) return console.log(err);
//             resolve(result.insertId)
//         })
// });
// }


// exports.create = function(name,origin) {
//     var values = [name, origin]
//
//     db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values, function(err, result) {
//         if (err)
//         {
//             console.log("Sorry");
//         }
//         console.log('the returning value ',result);
//         return result.insertId;
//     })
// }

//
// exports.create = async function (name,origin)  {
//     return new Promise((resolve,reject) => {
//
//           var values = [name, origin];
//          resolve( db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values ));
//           // console.log(result.insertId);
//          // return result.insertId;
//        } );
// };


// exports.create = async function (name,origin)  {
//     var values = [name, origin];
//    const promise = await db.get().query('INSERT INTO users ( Name, Origin ) VALUES(?, ?)', values );
//    console.log("THE RESULTS IS ",promise);
//     console.log("THE RESULTS IS ",promise.insertId);
//    console.log(THE )
//     return promise.insertId;
//        // .then( function(result){
//        //     return result.insertId;
//        // });
// };



// exports.getAllByUser = function(userId, done) {
//     db.get().query('SELECT * FROM comments WHERE user_id = ?', userId, function (err, rows) {
//         if (err) return done(err)
//         done(null, rows)
//     })
// }