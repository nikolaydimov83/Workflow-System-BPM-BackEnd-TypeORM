import { validate } from "class-validator"

export async function checkInput(valuesToValidate) {
    const errors = await validate(valuesToValidate)
    errors.forEach((err)=>{
        console.log(err)
    })
    if (errors.length>0){
        throw errors
    }

 }