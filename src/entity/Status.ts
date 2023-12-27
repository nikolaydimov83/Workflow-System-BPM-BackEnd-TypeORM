import { MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { checkInput } from "../utils/checkInput";
import { Role } from "./Role";

//{statusName,statusDate,nextStatuses:[],statusSender:User}
@Entity()
export class Status{
    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:'varchar',
        unique:true,
        collation:'SQL_Latin1_General_CP1_CI_AS'
    })
    @MinLength(1)
    statusName:string

    

    @ManyToMany(type => Status, (status:Status)=>status._id, {onDelete:'NO ACTION',onUpdate:'NO ACTION'})
    @JoinTable({
      name: 'status_next_statuses', // Specify the name of the join table
      joinColumn: { name: 'status_id', referencedColumnName: '_id'}, // Column for the current entity (Status)
      inverseJoinColumn: { name: 'next_status_id', referencedColumnName: '_id' }, 
        
    })
    nextStatuses: Status[];
    

    @ManyToOne(() => Role, (role:Role) => role._id)
    statusType:Role

    @CreateDateColumn()
    createdAt:Date
    
    @UpdateDateColumn()
    updatedAt:Date

    @BeforeInsert()
    @BeforeUpdate()
        updateStatus(){
                checkInput(this);
            }
}

/*const { Schema, model,Types } = require("mongoose");


const statusSchema=new Schema({
    statusName:{type:String, required:true,unique:true},
    nextStatuses:{type:[Types.ObjectId],ref:'Status'},
    statusCreateDate:{type:Date,default:Date.now,immutable:true},
    statusType:{type:Types.ObjectId, ref:'Role'}
});

statusSchema.index(
    {
    statusName:1
},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Status=model('Status', statusSchema);

module.exports=Status;*/