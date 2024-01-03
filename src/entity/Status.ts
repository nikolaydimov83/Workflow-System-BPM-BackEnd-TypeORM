import { MinLength } from "class-validator";
import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, In, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, getRepository } from "typeorm";
import { checkInput } from "../utils/checkInput";
import { Role } from "./Role";
import { StatusServices } from "../services/StatusServices";
import { AppDataSource } from "../data-source";
import { Workflow } from "./Workflow";

//{statusName,statusDate,nextStatuses:[],statusSender:User}
@Entity()
export class Status{
    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:'varchar',
        unique:true,
        collation:'utf8_unicode_ci'
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

 export async function getAllChildStatuses(statusInfo) {
    const statusRepository=AppDataSource.getRepository(Status)
    //let counter=0
    const result = new Set(); // Using a Set to ensure unique statusIds
  
    async function traverse(statusId) {
    let status;
    /*  if (counter==0){
        status=statusInfo
      } else{*/
        status = await statusRepository
        .findOne({
                    where:{_id:statusId},
                    relations:["statusType","nextStatuses"]
                });
     // }

     // counter++;
      if (!status||status.nextStatuses.length==0||!status.nextStatuses){
        result.add(statusId.toString());
        return;
      } 

      result.add(statusId.toString());
  
      for (const nextStatusId of status.nextStatuses) {
        if (!result.has(nextStatusId._id.toString())) {
          await traverse(nextStatusId._id);
        }else{
            return
        }
      }
    }
  
    await traverse(statusInfo);
  
    return Array.from(result); // Convert the Set to an array
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