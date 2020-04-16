const controller = require('../controllers');
const authenticator = require('../middlewares/authentication');
var multer  = require('multer');
var fs  = require('fs');
var fileName;

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = '../postsDb';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
        //appends the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. to start of original file name
    }
});
let upload = multer({storage: storage});

module.exports = (app) => {

    app.post('/tweet', upload.single('image'), controller.tweet.composeTweet);
    app.get('/tweet',authenticator, controller.tweet.allTweets);
    app.post('/signup', controller.user.signup);
    app.post('/login', controller.user.login);
    app.get('/user/:userhandle',authenticator, controller.user.search);
    app.get('/profile/:id', authenticator,controller.user.getProfile);
    app.get('/redirectedProfile/:userhandle',authenticator, controller.user.getProfileByUserhandle);
    app.patch('/profile/:id',authenticator, controller.user.updateProfile);
    app.post('/follow',authenticator, controller.follow.follow);
    app.post('/unfollow', authenticator, controller.follow.unfollow);
    app.post('/relation',authenticator, controller.follow.checkRelation);
    app.post('/comment',authenticator ,controller.comment.comment);
    app.post('/like',authenticator, controller.likeTweet.updateLike);
    app.put('/unlike',authenticator, controller.unlikeTweet.unlike);
    app.get('/explore',authenticator, controller.explore.getExploreTweets);
    app.get('/followers/:userhandle',controller.follow.getFollowersData);
    app.get('/following/:userhandle',controller.follow.getFollowingData);
}
