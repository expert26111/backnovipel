/**
 * Created by Yoana on 9/12/2017.
 */
var express = require('express');
var db_stories = require('../db_users');
var router = express.Router();
//var babelregister  = require('babel-register')({stage: 1});

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

// router.use(function(request,response,next){
//
//     var token = request.body.token || request.query.token || request.headers['x-access-token'];
//     if (token) {
//
//         // verifies secret and checks exp
//         jwt.verify(token,  config.secret, function(err, decoded) {
//             if (err) {
//                 return response.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 request.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return response.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
//
//
// })

router.route('/')
.post(parseUrlencoded, function (request,response){
         console.log("THE BODY IS ",request.body);
    db_stories.create(request.body.title, request.body.description, new Date(), request.body.img, request.body.link, function(err, id){
          if(err)
          {
              console.log(err);
              response.status(500).json("Internal Server Error");
          }else
          {
              response.status(201).json(id);
          }

       });
})
.get(function(request,response){
    db_stories.getAll(function(err, stories){
        if(err)
        {
            response.status(500).json("Internal Server Error");
        }else
        {
            //console.log("THE STORIES ARE ",stories);
            response.status(200).json(stories);
        }
    })
});

router.route('/:id')

    .delete(function(request,response){
        var storyId = request.params.id;
        //console.log("THE STORIES ARE DELETED ",storyId);
       //console.log("THE STORIES body ARE DELETED ",request.body);

        db_stories.deleteById(storyId, function(err){
            if(err)
            {
                response.status(500).json("Internal Server Error");
            }else
            {
              //  console.log("THE STORIES ARE DELETED ",story);
                response.status(200).json({ message: 'Deleted Story' });
               // response.status(204).end();
            }
        })
    })
    .get(function(request,response){
        var storyId = request.params.id;
         console.log("the id is ",storyId);
        db_stories.getById(storyId, function(err,story){
            if(err)
            {
                response.status(500).json("Internal Server Error");
            }else
            {
                response.status(200).json(story);
                // response.status(204).end();
            }
        })
    })
    .put(parseUrlencoded, function(request,response){
    var storyId = request.params.id;
    console.log('The body is ',request.body);
    db_stories.update(storyId,request.body.title, request.body.description, request.body.img, request.body.link, function(err, story){
        if(err)
        {
            console.log(err);
            response.status(500).json("Internal Server Error");
        }else
        {
            //  console.log("THE STORIES ARE DELETED ",story);
            response.status(200).json(story);
            // response.status(200).json({ message: 'Deleted Story' });
            // response.status(204).end();
        }
    })
})
    .patch(parseUrlencoded, function(request,response){
        var storyId = request.params.id;
        console.log('The body is ',request.body.title);
        db_stories.update2(storyId,request.body.title,request.body.description, request.body.img, request.body.link, function(err, story){
            if(err)
            {
                console.log(err);
                response.status(500).json("Internal Server Error");
            }else
            {
                //  console.log("THE STORIES ARE DELETED ",story);
                response.status(200).json(story);
                // response.status(200).json({ message: 'Deleted Story' });
                // response.status(204).end();
            }
        })
    })

module.exports = router;// exports the router as a Node module



// .all(function(request, response, next){
//     request.blockName = parseName(request.params.name);
//     next();
// })
// .delete(function (request,response) {
//     if(users[request.blockName]) {
//         delete users[request.blockName];
//         response.sendStatus(200);//some clients can not handle empty respond very well
//     }else{
//         response.sendStatus(404);
//     }


//     .get(function(request,response){
//         var userorigin = users[request.blockName];//if you have a route for example blocks/:name
//         if(!userorigin)
//         {
//             response.status(404).json('No Person found with Name: '+request.params.name);
//         }else {
//             response.json(userorigin);// it sets the status code to 200 success
//         }
//     });


