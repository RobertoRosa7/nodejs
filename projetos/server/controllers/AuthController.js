const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const constants = require('../utils/constants');

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

    }
}