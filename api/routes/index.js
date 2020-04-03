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

    app.post('/tweet', upload.single('image'), controller.composeTweet.composeTweet);

    //new

    app.post('/signup', controller.user.signup);
    app.post('/login', controller.user.login);
    app.get('/profile/:id', controller.user.getProfile);
    app.patch('/profile/:id', controller.user.updateProfile);


    //new
    app.post('/follow',controller.follow.follow);
    app.post('/unfollow',controller.follow.unfollow);
    app.post('/comment',controller.comment.comment);

    //like
    app.post('/like',controller.likeTweet.updateLike);
    app.put('/unlike',controller.unlikeTweet.unlike);
}
