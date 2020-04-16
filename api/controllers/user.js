const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User, validateUser } = require('../models/user');
const model = require('../models/userModel');
const authenticate = require('../middlewares/authentication');

class UserController{
    constructor(){
        
    }
    async signup (req, res) {
        const { error, value } = validateUser(req.body);
        if(error) return res.status(400).send({
            success: false,
            error: error.details[0].message
        });

        let user = await User.findOne({ "email": value.email });
        if(user) return res.status(401).send({
            success: false,
            error: 'User with this email already registered'
        });

        user = await User.findOne({ "userhandle": value.userhandle });
        if(user) return res.status(401).send({
            success: false,
            error: 'User with this userhandle already registered'
        });

        user = new User(value);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt);

        user.password = hashedPassword;
        user = await user.save();

        const token = jwt.sign({ _id: user._id, userhandle: user.userhandle, name: user.name }, config.get('jwtPrivateKey'));

        res.send({
            success: true,
            payload: {
                _id: user._id,
                'x-auth-token': token
            },
            message: 'Signed Up Successfully! LoggedIn'
        });
    };

    async login(req, res){
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if(!user) return res.status(401).send({
            success: false,
            error: 'Invalid email or password'
        });
     
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) return res.status(401).send({
            success: false,
            error: 'Invalid email or password'
        });

        const token = jwt.sign({ _id: user._id, userhandle: user.userhandle, name: user.name }, config.get('jwtPrivateKey'));

        res.send({
            success: true,
            payload: {
                _id: user._id,
                'x-auth-token': token
            },
            message: 'Signed Up Successfully! LoggedIn'
        });
    };

    async getProfile (req, res) {
        const _id= req.params.id;
        const user = await User.findById({"_id":_id}).select('-password');
        if(user!=null){
            res.status(200).send(user);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
        
    };

    async getProfileByUserhandle (req,res){
        const userhandle=req.params.userhandle;
        const user = await User.findOne({"userhandle":userhandle}).select('-password');
        if(user!= null){
            res.status(200).send(user);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
      
    };
    
    async updateProfile(req,res) {
            try{
            let updateObj= req.body;
            const user= await User.update({_id: req.params.id},  updateObj);
            res.status(200).send({success: true,
                payload: {
                    user}
                });
            }
            catch(error){
                console.log(error);
            }
        
        
    }

    async search(req, res){
        let queryObject = { $regex: req.params.userhandle, $options: 'i'};
        const employees = await User.find({userhandle: queryObject}, {name: 1, userhandle: 1});
        if(employees != null){
            res.status(200).send(employees);
        }
        else{
            res.status(404).send("Not Found");
        }
    }
}
module.exports = new UserController();
