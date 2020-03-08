const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function(req, res){
        try{
            const u = await UserModel.findOne({"email": req.body.email});
            if(!u){
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, constants.bcryptsalts)
                await user.save();
                // antes de enviar para front deletar campo password
                delete user.password;
                res.status(200).json(user);
            }else{
                res.status(403).json({"status": false, "error": e, "msg": 'E-mail already registered!'});
            }
        }catch(e){
            res.status(500).json({"status": false, "error": e, "msg": 'Error while save user!'});
        }
    },
    login: function(req, res){
        const email = req.body.email;
        const password = req.body.password;

        // lean() para somente atributos e valores
        UserModel.findOne({"email":email}).lean().exec(function(err, user){
            if(err) return res.status(500).json({"status":false,"msg":"Server error","error":err});
            
            const auth_err = (password == '' || password == null || !user);

            if(!auth_err){
                if(bcrypt.compareSync(password, user.password)){
                    // user logged - create token
                    const token = jwt.sign({"_id":user._id},constants.key_jwt,{expiresIn:constants.expires_jwt});
                    delete user.password;
                    return res.status(200).json({...user,"token":token});
                }else{
                    return res.status(404).json({"status":false,"msg":"E-mail or Password is wrong!"});
                }
            }else{
                return res.status(404).json({"status":false,"msg":"No user found!"});
            }
        });
    },
    authorization: function(req, res, next){
        const token = req.get('Authorization');
        if(!token) return res.status(401).json({"status":false, "msg":'Token not found!'});
        
        // validação do token
        jwt.verify(token, constants.key_jwt, verifyToken);
        function verifyToken(err, decoded){
            if(err || !decoded) return res.status(401).json({"status":false, "msg":'Token not valid!'});
            next();
        }
    }
}