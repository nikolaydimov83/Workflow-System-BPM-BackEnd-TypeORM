import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./Workflow";
import { DeadlineDateValidator } from "../validators/deadline";
import { IsEnum, IsInt, Max, MaxLength, Min, MinLength, Validate } from "class-validator";
import { checkInput } from "../utils/checkInput";
import { Status } from "./Status";
import { IApplyIdValidator } from "../validators/iApplyId";
import { Comment } from "./Comment";
import { Subject } from "./Subject";
import { UserActiveDir } from "./UserActiveDir";

export enum CCY {
    BGN = 'BGN',
    EUR = 'EUR',
    USD = 'USD'
  }

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

    
    @ManyToOne(
        ()=>Status, (status)=>status._id,
        {nullable:false})
    status:Status

    @Column({
        type:'datetime2',
        nullable:false
    })
    statusIncomingDate:Date

    @Column({
        type:'nvarchar',
        nullable:false
    })
    statusSender:string

    @Column({
        type:"nvarchar",
        nullable:false
    })
    @MinLength(15)
    description:string

    @Column({
        type:"smallint",

    })
    @IsInt()
    @Min(1)
    @Max(999)
    finCenter:number

    @Column({
        type:"smallint",

    })
    @IsInt()
    @Min(1)
    @Max(999)
    refferingFinCenter:number

    @Column({
        type:"nvarchar",
        nullable:false
    })
    @Validate(IApplyIdValidator)
    iApplyId:string

    @Column({
        type:"nvarchar",
        nullable:false
    })
    clientName:string

    @Column({
        type:"nvarchar",
        nullable:false
    })
    @MinLength(9)
    @MaxLength(10)
    clientEGFN:string

    @Column({
        type:"nvarchar",
        nullable:false
    })
    product:string

    @Column({
        type:"real",
        nullable:false
    })
    @Min(1000)
    amount:number

    @Column({
        type:"nvarchar",
        nullable:false
    })
    @IsEnum(CCY, { message: 'Invalid user currency' })
    ccy:CCY

    @OneToMany(()=>Comment, (comment)=>comment._id)
    comments:Comment[]

    @ManyToOne(()=>Subject, (subject)=>subject._id)
    subjectId:Subject

    @OneToOne(()=>UserActiveDir, (user)=>user._id)
    requestCreatorEmail:Subject

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
   
  
    history:{type:[],default:[]},
    

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