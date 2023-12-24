import UserActiveDirServices from '../services/UserActiveDirServices'

//const { getAllActiveDirUsers, getActiveDirUserByID, editUserById, createUser } = require('../services/adminServices');
//const { getAllRoles } = require('../services/workflowServices');
//const { parseError } = require('../utils/utils');


export const adminUsersRightsControler=require('express').Router();

adminUsersRightsControler.get('/',async(req,res)=>{
    try {
        let data=await UserActiveDirServices.getAllActiveDirUsers();
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(401);
        //res.json({message:parseError(error)});
    }


});

adminUsersRightsControler.post('/',async(req,res)=>{
    try {

        let user=await UserActiveDirServices.createUser(req.body);
        res.status(201);
        res.json(user);
    } catch (error) {
        res.status(401);
        console.log(error)
        res.json(error)
        //res.json({message:parseError(error)});
    }
   

});

adminUsersRightsControler.get('/:id',async(req,res)=>{
    let id =req.params.id;
    try {
        let data = await UserActiveDirServices.getActiveDirUserByID(id);

        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(401);
        res.json(error)
        //res.json({message:parseError(error)});
    }
});

adminUsersRightsControler.put('/:id',async(req,res)=>{
    let id =req.params.id;
    try {
        const updateUsr=await UserActiveDirServices.editUser(id, req.body);
        res.status(201);
        res.json(updateUsr)
    } catch (error) {
        res.status(401);
        res.json(error);
        //res.json({message:parseError(error)})
    }
});

/*

*/

//module.exports=adminUsersRightsControler;


