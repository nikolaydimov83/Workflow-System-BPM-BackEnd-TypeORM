import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";
import { Status } from "../entity/Status";
import { Workflow } from "../entity/Workflow";
import { createEntityInstance } from "./factories/createEntityInstanceFactory";
import { UserActiveDir } from "../entity/UserActiveDir";
import UserActiveDirServices from "./UserActiveDirServices";

const statusRepository=AppDataSource.getRepository(Status);
const roleRepository=AppDataSource.getRepository(Role);
const workflowRepository=AppDataSource.getRepository(Workflow)
export class WorkflowServices{

    static async  createWorkflow(workflowName,initialStatus,rolesAllowedToFinishRequest=[]){
        await checkWorkflowData(initialStatus,rolesAllowedToFinishRequest);
        rolesAllowedToFinishRequest=rolesAllowedToFinishRequest.map((role)=>{return Number(role)});
        const newRolesAllowed = await roleRepository.findBy({_id:In(rolesAllowedToFinishRequest)})
        let workflow=createEntityInstance(Workflow,{workflowName,initialStatus,rolesAllowedToFinishRequest:newRolesAllowed})
        
        await workflowRepository.save(workflow);
        await workflowRepository.save(workflow);
    }
    
    static async  getAllWorkflows(){
        return await workflowRepository.find({relations:['rolesAllowedToFinishRequest','initialStatus','allowedStatuses']})//Workflow.find({}).populate('rolesAllowedToFinishRequest initialStatus').populate({path:'allowedStatuses',populate:'statusType'}).lean();
    }
    static async getWorkflowById(workflowId){
        return await workflowRepository.findOne({where:{_id:workflowId},relations:['rolesAllowedToFinishRequest','initialStatus','allowedStatuses']})
    
    }

    static async checkUserRoleIsPriviliged(workflowId,user){
        let userFromActiveDir=await UserActiveDirServices.getActiveDirUserByID(user.userStaticInfo)

        let dbWorkFlow=await this.getWorkflowById(workflowId);
        if(dbWorkFlow.rolesAllowedToFinishRequest.findIndex((a)=>a._id.toString()==userFromActiveDir.role.toString())>-1){
            return true
        }else{
            return false
        }
    }
    static async editWorkflow(workflowInfo){
        let workflowId=workflowInfo.id;
        let workflowName=workflowInfo.workflowName;
        let initialStatus=workflowInfo.initialStatus;
        let rolesAllowedToFinishRequest=workflowInfo.rolesAllowedToFinishRequest;
        if(!rolesAllowedToFinishRequest){
            rolesAllowedToFinishRequest=[];
        }
        rolesAllowedToFinishRequest=rolesAllowedToFinishRequest.map((role)=>{return Number(role)});
        const newRolesAllowed = await roleRepository.findBy({_id:In(rolesAllowedToFinishRequest)})
        await checkWorkflowData(initialStatus,rolesAllowedToFinishRequest);
        const workflow=await workflowRepository.findOne({where:{_id:workflowId}});
        workflow.workflowName=workflowName;
        workflow.initialStatus=initialStatus;
        workflow.rolesAllowedToFinishRequest=newRolesAllowed;
        await workflowRepository.save(workflow)
        await workflowRepository.save(workflow)        
        return workflow
    }
} 

async function checkWorkflowData(initialStatus,rolesAllowedToFinishRequest){
    const foundInitialStatus=await statusRepository.findOneBy({_id:initialStatus})
    if (!foundInitialStatus){
        throw new Error('You are trying to create a workflow with non-existing initial status')
    }
    
    if (rolesAllowedToFinishRequest.length > 0) {
        rolesAllowedToFinishRequest.forEach(async (role) => {
            const foundRole=await roleRepository.findOneBy({_id:role})
            if (!foundRole) {
                throw new Error(`Role with ID ${role} is not found in the roles database. You can assign only existing roles in rolesAllowedToFinishTheRequest`);
            }
        });
    }

    

}


/*





async function addAllowedStatus(workflowName,status){
    const workflow=await Workflow.findOne({workflowName});
    if (!workflow){
        throw new Error('Workflow with this name was not found!')
    }
    workflow.allowedStatuses.push(status);
    workflow.save();

}

async function removeAllowedStatus(status,workflowName){
   const workflowDB=await Workflow.findOne(workflowName);
   if (!workflowDB){
    throw new Error('Workflow with this name does not exist')
   }
   let index=workflowDB.allowedStatuses.indexOf(status.id);
   if (index>-1){
        workflowDB.allowedStatuses.splice(index,1);
        workflowDB.save();
   }else{
    throw new Error('Status not found!')
   }
   

}







async function getWorkflowByStatusId(statusId){
    let result= await Workflow.find({allowedStatuses: { $in: [statusId] }})

    return result
}*/