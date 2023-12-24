import { AppDataSource } from "../data-source"
import { Role } from "../entity/Role"

export class RoleServices {

    
    
    static async createRole(roleInfo:Role){
        const roleRepository = AppDataSource.getRepository(Role);
        const role = Object.assign(new Role(), roleInfo);

        return roleRepository.save(role)
        
    }

    static async getAllRoles(){
        const roleRepository = AppDataSource.getRepository(Role);
        let result=await roleRepository.find({});
        return result
    }

    static async getRoleById(id:number){
        const roleRepository = AppDataSource.getRepository(Role);
        let result=await roleRepository.createQueryBuilder("role").where("role._id= :roleId",{roleId:id}).getOne()
        return result
    }

    static async editRole(roleInfo:Role,id:string){
        const roleRepository = AppDataSource.getRepository(Role);
        const idNum=parseInt(id)
        const roleToUpdate=await roleRepository.findOne({where:{_id:idNum}});
        Object.assign(roleToUpdate,roleInfo)
        roleRepository.save(roleToUpdate);
        

    }

}

/*










async function createWorkflow(workflowName,initialStatus,rolesAllowedToFinishRequest=[]){
    await checkWorkflowData(initialStatus,rolesAllowedToFinishRequest);
    let workflow=await Workflow.create({workflowName,initialStatus,rolesAllowedToFinishRequest});
    return workflow
}

async function editWorkflow(workflowInfo){
    let workflowId=workflowInfo.id;
    let workflowName=workflowInfo.workflowName;
    let initialStatus=workflowInfo.initialStatus;
    let rolesAllowedToFinishRequest=workflowInfo.rolesAllowedToFinishRequest;
    if(!rolesAllowedToFinishRequest){
        rolesAllowedToFinishRequest=[];
    }
    await checkWorkflowData(initialStatus,rolesAllowedToFinishRequest);
    let workflow=await Workflow.findByIdAndUpdate(workflowId,{workflowName,initialStatus,rolesAllowedToFinishRequest});
    return workflow
}


async function checkWorkflowData(initialStatus,rolesAllowedToFinishRequest){
    let allStatuses=await Status.find({});
    if (allStatuses.findIndex((stat)=>stat._id==initialStatus)==-1){
        throw new Error('You are trying to create a workflow with non-existing initial status')
    }
    let allRoles=await Role.find({})
    if (rolesAllowedToFinishRequest.length > 0) {
        rolesAllowedToFinishRequest.forEach((role) => {
            if (allRoles.findIndex((roleFromAllRoles) => roleFromAllRoles._id == role) == -1) {
                throw new Error(`Role with ID ${role} is not found in the roles database. You can assign only existing roles in rolesAllowedToFinishTheRequest`);
            }
        });
    }
}
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

async function getWorkflowById(workflowId){
    return await Workflow.findById(workflowId).populate('rolesAllowedToFinishRequest').populate('allowedStatuses');

}

async function checkUserRoleIsPriviliged(workflowId,user){
    let userFromActiveDir=await getActiveDirUserByID(user.userStaticInfo);
    let dbWorkFlow=await getWorkflowById(workflowId);
    if(dbWorkFlow.rolesAllowedToFinishRequest.findIndex((a)=>a.id.toString()==userFromActiveDir.role.toString())>-1){
        return true
    }else{
        return false
    }
}

async function getAllWorkflows(){
    return Workflow.find({}).populate('rolesAllowedToFinishRequest initialStatus').populate({path:'allowedStatuses',populate:'statusType'}).lean();
}

async function getWorkflowByStatusId(statusId){
    let result= await Workflow.find({allowedStatuses: { $in: [statusId] }})

    return result
}*/