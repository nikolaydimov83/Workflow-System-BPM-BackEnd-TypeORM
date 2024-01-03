
import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DataSource, Entity, In, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status, getAllChildStatuses } from "./Status";
import { Role } from "./Role";
import { StatusServices } from "../services/StatusServices";
import { AppDataSource } from "../data-source";


@Entity()
export class Workflow{
    @PrimaryGeneratedColumn()
    _id:number


    @Column({type:"varchar", unique:true, collation:'utf8_unicode_ci'})
    workflowName:string

    @ManyToMany(()=>Status)
    @JoinTable()
    allowedStatuses:Status[]

    @ManyToMany(()=>Role, (role)=>role._id)
    @JoinTable()
    rolesAllowedToFinishRequest:Role[]

    @ManyToOne(()=>Status,(initialStatus)=>initialStatus._id)
    @JoinColumn()
    initialStatus:Status

    @CreateDateColumn()
    workflowCreateDate:Date
    
    @UpdateDateColumn()
    updatedAt:Date

    @BeforeUpdate()
    @BeforeInsert()
      async updateAllowedStatuses(){
        const statusRepository=AppDataSource.getRepository(Status)
        const allStatusesIds=(await getAllChildStatuses(this.initialStatus)).map((id)=>Number(id))
        const allStatuses=await statusRepository.find({where:{_id:In(allStatusesIds)}})
        this.allowedStatuses=allStatuses
      

      }

}

/*const { Schema, model,Types } = require("mongoose");
const Status = require("./Status");


const workflowSchema=new Schema({
    workflowName:{type:String, require:true, unique:true},
    allowedStatuses:{type:[Types.ObjectId],ref:'Status'},
    workflowCreateDate:{type:Date,default:Date.now,immutable:true},
    rolesAllowedToFinishRequest:{type:[Types.ObjectId], ref:'Role'},
    initialStatus:{type:Types.ObjectId,ref:'Status', require:true},
});

workflowSchema.index({workflowName:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

workflowSchema.pre(['save','findOneAndUpdate'], async function (next,options) {
    // If the `initialStatus` field has been modified or allowedStatuses is not set
    let initialStatusId;
    if (this.isNew){
        initialStatusId = this.initialStatus;
        const childStatuses = await getAllChildStatuses(initialStatusId);
        this.allowedStatuses = childStatuses;
        
    } else if (this._update){
        initialStatusId = this._update.initialStatus;
        const childStatuses = await getAllChildStatuses(initialStatusId);
        this._update.allowedStatuses=childStatuses;
    }
    else {
      initialStatusId=this.initialStatus;
      let changedStatus=options.statusInfo;
      const childStatuses=await getAllChildStatuses(initialStatusId,changedStatus);
      this.allowedStatuses=childStatuses;
    }
      
  
      // Assign the childStatuses to the allowedStatuses property
      
    
  
    // Continue with the save operation
    
  });

async function getAllChildStatuses(statusId,statusInfo) {
    
    const result = new Set(); // Using a Set to ensure unique statusIds
  
    async function traverse(statusId) {
       
      const status = await Status.findById(statusId);
      if(statusInfo){


        if(status.id.toString()===statusInfo.id){
        status.nextStatuses=statusInfo.nextStatuses
      }
      }

      
      if (!status||status.nextStatuses.length==0||!status.nextStatuses){
        result.add(statusId.toString());
        return;
      } 

      result.add(statusId.toString());
      console.log
      for (const nextStatusId of status.nextStatuses) {
        if (!result.has(nextStatusId.toString())) {
          await traverse(nextStatusId);
        }else{
            
        }
      }
    }
  
    await traverse(statusId);
  
    return Array.from(result); // Convert the Set to an array
  }
const Workflow=model('Workflow', workflowSchema);

module.exports=Workflow;*/