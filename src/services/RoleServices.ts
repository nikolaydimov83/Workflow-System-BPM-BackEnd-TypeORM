import { AppDataSource } from "../data-source"
import { Role } from "../entity/Role"

class RoleInfo{
    
    roleName:'string'
}

export class RoleServices {

    
    
    static async createRole(roleInfo:RoleInfo){
        const roleRepository = AppDataSource.getRepository(Role)
        const role = Object.assign(new Role(), roleInfo)

        return roleRepository.save(role)
        
    }

    /*async all(request: Request, response: Response, next: NextFunction) {
        return this.roleRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.roleRepository.findOne({
            where: { _id:id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { roleName } = request.body;
        const role = Object.assign(new Role(), {
            roleName
        })

        return this.roleRepository.save(role)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let roleToRemove = await this.roleRepository.findOneBy({ _id:id })

        if (!roleToRemove) {
            return "this user not exist"
        }

        await this.roleRepository.remove(roleToRemove)

        return "user has been removed"
    }*/

}

/*async function createRole(roleInfo){
    let result=await Role.create(roleInfo)
    
    return result
}

async function editRole(roleInfo,id){
    roleInfo.role='';
    if (roleInfo.roleType=='Branch'){
        roleInfo.role=roleInfo.roleType+roleInfo.roleName;
    }else{
        roleInfo.role=roleInfo.roleName;
    }
   // const session = await mongoose.startSession();
    //let oldRole=(await Role.findById(id)).role.toString();
    let result;
    //await session.startTransaction();
    
    //try {
        
        
        result=await Role.findByIdAndUpdate(id,roleInfo);
  //      let updatedUsers=await editAllUsersWithRole(oldRole,session);
    //    await session.commitTransaction();
    //} catch (error) {
    //  await session.abortTransaction();
    //throw error;
    //} finally {
      session.endSession();
   // }

    
    return result
}

async function getAllRoles(){
    let result=await Role.find({}).lean()
    return result
}


async function getRoleById(id){
    let result=await Role.findById(id).lean()
    return result
}



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