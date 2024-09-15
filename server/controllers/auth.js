const User = require("../models/User")
const bcrypt  = require("bcrypt")


module.exports.registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({email, username, password: hashedPassword});
        const new_user = await user.save()
        res.send({success: true, user})
    }
    catch(err){
        res.send({success: false, message: err.message})
    }
}

module.exports.loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username})
    
        if(!user){
            return res.send({success: false, message: "Incorrect username or password"})
        }
    
        const result = await bcrypt.compare(password, user.password)
    
        if(result){
            res.send({success: true, user})
        }
    
        else{
            res.send({success: false})
        }
    }

    catch(err){
        res.send({success: false, message: err.message})
    }
    
}


module.exports.setAvatar = async (req, res) => {

    try{
        const {avatar_url} = req.body;
        const user_id = req.params.user_id;
        const user = await User.findById(user_id);
        user.avatar = avatar_url;
        await user.save()
        res.send({success: true})
    }

    catch(err){
        res.send({success: false, message: err.message})
    }
 
}

module.exports.getAllUsers = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const allUsers = await User.find();
    
        const filtered_users = allUsers.filter((user) => user.id != user_id)
        return res.send({succcess: true, filtered_users})
    }

    catch(err){
        return res.send({success: false})
    }


}