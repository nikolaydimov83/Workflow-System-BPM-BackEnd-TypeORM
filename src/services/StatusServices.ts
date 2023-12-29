import { AppDataSource } from "../data-source";
import { Status } from "../entity/Status";
import { Role } from "../entity/Role";
import { RoleServices } from "./RoleServices";
import { createEntityInstance } from "./factories/createEntityInstanceFactory";
import { In } from "typeorm";


const statusRepository =AppDataSource.getRepository(Status)
const roleRepository = AppDataSource.getRepository(Role)


export class StatusServices{
    
    static async createStatus(statusInfo){
        let nextStatusesIds=statusInfo.nextStatuses.map((id:string)=>Number(id));
        let statusName=statusInfo.statusName;
        let statusType=statusInfo.statusType;
    
        await checkStatus(nextStatusesIds, statusType);
        const nextStatuses=await statusRepository.findBy({_id:In(nextStatusesIds)})
        const status = createEntityInstance(Status,{statusName,statusType,nextStatuses})
        return await statusRepository.save(status)
    }

    
    static async getAllStatuses(){
        let result = await statusRepository.find({relations:["statusType","nextStatuses"]})
        return result
    }
    
    static async getStatusById(id:number){
        return await statusRepository.findOne({where:{_id:id},relations:["statusType","nextStatuses"] })
    }
    
    /*async function editStatus(statusInfo){
        let nextStatuses=statusInfo.nextStatuses;
        let statusName=statusInfo.statusName;
        let statusType=statusInfo.statusType;
        
        await checkStatus(nextStatuses,statusType);
        let workflowsOfTheEditedStatus=await getWorkflowByStatusId(statusInfo.id);
        const session1 = await mongoose.startSession();
        session1.startTransaction();
    
        try {
    
            for (const workflow of workflowsOfTheEditedStatus) {
                
                await workflow.save({ session:session1,statusInfo:statusInfo});
                
            }
    
            let result= await Status.findByIdAndUpdate(statusInfo.id,{statusName,statusType,nextStatuses},{
                new: true, // Return the updated document
                session:session1, // Assign the session to the operation
              })
          await session1.commitTransaction();
    
          return result
        } catch (error) {
          await session1.abortTransaction();
          throw error;
        } finally {
            await session1.endSession()
          
        }
    }*/
     static async getAllClosedStatuses(){
        let closedRole=await roleRepository.findOneBy({role:'Closed'});
        let result =await statusRepository
        .find({
            relations:{statusType:true},
            where: {
            statusType: {
                _id: closedRole._id
                
            }}});
        return result
    }  
    static async checkIfStatusIsClosed(status){
        let closedRole=await roleRepository.findOneBy({role:'Closed'});
        return status.statusType.toString() === closedRole._id.toString();
    } 
    static async getAllChildStatuses(statusInfo) {
        let counter=0
        const result = new Set(); // Using a Set to ensure unique statusIds
      
        async function traverse(statusId) {
        let status;
          if (counter=0){
            status=statusInfo
          } else{
            status = await statusRepository
            .findOne({
                        where:{_id:statusId},
                        relations:["statusType","nextStatuses"]
                    });
          }

          counter++;
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
    /*static async getAllChildStatuses(statusId) {
    
        const result = new Set(); // Using a Set to ensure unique statusIds
      
        async function traverse(statusId) {
           
          const status = await statusRepository
            .findOne({
                        where:{_id:statusId},
                        relations:["statusType","nextStatuses"]
                    });
          
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
      
        await traverse(statusId);
      
        return Array.from(result); // Convert the Set to an array
      }*/
}



async function checkStatus(nextStatuses, statusType) {
    if (!nextStatuses) {
        nextStatuses = [];
    }
    if (nextStatuses.constructor !== Array) {
        nextStatuses = [nextStatuses];
    }
    let allRoles = await RoleServices.getAllRoles();
    let allStatuses = await StatusServices.getAllStatuses();

    if (allRoles.findIndex((role) => role._id == statusType) == -1) {
        throw new Error('Status type is invalid value - please choose status type that corresponds to specific role');
    }
    if (nextStatuses.length > 0) {
        nextStatuses.forEach((status) => {
            if (allStatuses.findIndex((statusFromAllStatuses) => statusFromAllStatuses._id == status) == -1) {
                throw new Error(`Status from next Statuses with ID ${status} is not found in the statuses database. You can assign only existing statuses as next status`);
            }
        });
    }

}


















