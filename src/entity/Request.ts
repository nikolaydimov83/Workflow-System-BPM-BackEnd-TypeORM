import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./Workflow";
import { DeadlineDateValidator } from "../validators/deadline";
import { Validate } from "class-validator";
import { checkInput } from "../utils/checkInput";

@Entity()
export class Request{
    
    @PrimaryGeneratedColumn()
    _id:number

    @ManyToOne(
        ()=>Workflow, (workflow)=>workflow._id,
        { nullable: false })
    requestWorkflow:Workflow

    @Column()
    @Validate(DeadlineDateValidator)
    deadlineDate:Date


    @BeforeInsert()
    @BeforeUpdate()
    async checkBeforeUpdate(){
        try {
           await checkInput(this)
        } catch (error) {
            throw error
        }
        
    }
}

/*const { Schema, model,Types } = require("mongoose");

const requestSchema=new Schema({
   
    deadlineDate:{type:Date, required:true,validate:{
        validator:async (value)=>{
            let today=new Date()
            today.setHours(0,0,0,0);
            value.setHours(0,0,0,0);
            return value>=today

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    status:{type:Types.ObjectId, ref:'Status'},
    statusIncomingDate:{type:Date, required:true},
    statusSender:{type:String,required:true},
    history:{type:[],default:[]},
    description:{type:String, minLength:15},
    finCenter:{type:Number,required:true,min:1,max:999},
    refferingFinCenter:{type:Number,min:1,max:999},
    iApplyId:{type:String,required:true,validate:{
        validator:async (value)=>{
            const regex=/^[A-Z]{2}[0-9]+$/
            return regex.test(value)

        },
        message:(props)=>{return `${props.value} is not a valid I-applyId` }
    }},
    clientName:{type:String,required:true},
    clientEGFN:{type:String,required:true,minLength:9,maxLength:10},
    product:{type:String,required:true},
    amount:{type:Number, min:1000},
    ccy:{type:String, enum:['BGN', 'EUR','USD','Other']},
    comments:{type:[Types.ObjectId],ref:'Comment',default:[]},
    subjectId:{type:Types.ObjectId, ref:'Subject',req:true},
    requestCreatorEmail:{type:String,ref:'User',req:true}  
});

requestSchema.index({iApplyId:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

requestSchema.index({finCenter:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

requestSchema.index({refferingFinCenter:1},{
    collation:{
        locale:'en',
        strength:2
    }
});





const Request=model('Request', requestSchema);

module.exports=Request;*/