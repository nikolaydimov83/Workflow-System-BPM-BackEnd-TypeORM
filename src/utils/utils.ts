//const UserActiveDir = require("../models/UserActiveDir");

import { ValidationError } from "class-validator";

export function parseError(errors:any){
    if (errors.message){
        return errors.message
    }else if(errors.errors){
        return errors.errors.map((e)=>e.msg).join('\n')
    }
    return errors.map((err)=>{
        return err.constraints
    }).map((e)=>Object.values(e)).join('\n')
}

/*function checkUserEnrolled(instance,req) {
    let userHasEnrolled=false
    if (instance.enrolledUsers.length > 0) {
        if (instance.enrolledUsers.find((user) => user._id.toString() === req.userData._id.toString())) {
            userHasEnrolled = true;
        }
    }
    return userHasEnrolled;
}

function renameBodyProperties(req) {
    //Array of arrays for properties to remove. Each array consists of 
    //roperty name from form as first parameter, property name of Shema as second
    const propertiesToRename=[]
    let instance = req.body;
    propertiesToRename.forEach((prop)=>{
        instance[prop[1]]=instance[prop[0]];
        delete instance[prop[0]]
    })

    return instance;
}

function sortWithType(array,sortType,sortProperty,sortIndex){
    if(sortIndex!=-1){
        sortIndex=1
    }else{
        sortIndex=-1
    }

    let sortTypes={
        'String':(array,sortProperty)=>{
           let a=  array.sort((a, b) => (a[sortProperty] > b[sortProperty] ? sortIndex*1 : sortIndex*-1));
           return a
        },
        'Number':(array)=>{
            return array.sort((a,b)=>{
                return sortIndex*(a[sortProperty] - b[sortProperty])
            })
        },
        'Date':(array)=>{
            return array.sort((a,b)=>{
                return sortIndex*((new Date(a[sortProperty]) - new Date(b[sortProperty])));
            })
        },
        'ObjectID':(array)=>{
            
            let a=  array.sort((a, b) =>{ 
                let keys=Object.keys(a[sortProperty]);
                const innerProperty=keys.find(a=>a.includes('Name'));
                return (a[sortProperty][innerProperty] > b[sortProperty][innerProperty] ? sortIndex*1 : sortIndex*-1)
           
        });
        return a
        }
    }
    return {sortedData:sortTypes[sortType](array,sortProperty),newSortIndex:-sortIndex}
}


function escapeRegExp(string) {
    
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

}*/


//module.exports={parseError,renameBodyProperties,checkUserEnrolled,sortWithType,escapeRegExp}


