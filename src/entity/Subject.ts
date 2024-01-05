import { MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { checkInput } from "../utils/checkInput";
import { Workflow } from "./Workflow";

@Entity()
export class Subject{
    @PrimaryGeneratedColumn()
    _id:number

    @Column
    ({
        unique:true, 
        type:'varchar',
        collation:'Cyrillic_General_CI_AS'
    })
    @MinLength(1)
    subjectName:string

    @ManyToOne(
        ()=>Workflow, (workflow:Workflow)=>workflow._id)
        assignedToWorkflow:Workflow
    

    @CreateDateColumn()
    subjectCreateDate:Date
    
    @UpdateDateColumn()
    updatedAt:Date

    @BeforeInsert()
    @BeforeUpdate()
        updateSubject(){
            try {
                checkInput(this)
            } catch (error) {
                throw error    
            }
            
        }

   
}

/*const { Schema, model,Types } = require("mongoose");


const subjectSchema=new Schema({
    subjectName:{type:String, required:true, unique:true},
    subjectCreateDate:{type:Date,default:Date.now,immutable:true},
    assignedToWorkflow:{type:Types.ObjectId,ref:'Workflow',required:true}
});

subjectSchema.index({subjectName:1},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Subject=model('Subject', subjectSchema);

module.exports=Subject;*/ 