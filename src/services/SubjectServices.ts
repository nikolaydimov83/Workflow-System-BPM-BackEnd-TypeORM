
import { AppDataSource } from "../data-source";
import { Subject } from "../entity/Subject";
import { Workflow } from "../entity/Workflow";
import { WorkflowServices } from "./WorkflowServices";
import { createEntityInstance } from "./factories/createEntityInstanceFactory";

const subjectRepository=AppDataSource.getRepository(Subject)
const workflowRepository=AppDataSource.getRepository(Workflow)
export class SubjectServices{

    static async getAllSubjects(){
        return await subjectRepository.find({relations:['assignedToWorkflow']})
    }

    static async getSubjectById(id){
        return await subjectRepository.findOne({where:{_id:id},relations:['assignedToWorkflow']})
    }
    static async createSubject(subject){
        let subjectName=subject.subjectName;
        let assignedToWorkflow=await WorkflowServices.getWorkflowById(Number(subject.assignedToWorkflow))
        const newSubject=createEntityInstance(Subject,{subjectName,assignedToWorkflow})
        await subjectRepository.save(newSubject)
        return newSubject
    }
    static async editSubjectById(id,subjectData){
        const subject=await subjectRepository.findOne({where:{_id:id},relations:['assignedToWorkflow']})
        subject.subjectName=subjectData.subjectName
        subject.assignedToWorkflow=await WorkflowServices.getWorkflowById(Number(subjectData.assignedToWorkflow))
        await subjectRepository.save(subject)
        return subject
    } 
    
    static async findWorkflowBySubjectId(subjectId){
        let subject=await SubjectServices.getSubjectById(subjectId)
        return subject.assignedToWorkflow
    }
    static async findAllSubjectsByRole(role){
  
        //let allWorkflows=await Workflow.find({}).populate('initialStatus');
        //let workflows=allWorkflows.filter((workflow)=>workflow.initialStatus.statusType.toString()==role.toString());
        const workflows = await workflowRepository
        .createQueryBuilder("workflow")
        .leftJoin("workflow.initialStatus", "initialStatus")
        .where("initialStatus.statusType._id = :roleId", { roleId: Number(role._id) })
        .getMany();
        let result=new Set()
    
        for (const workflow of workflows) {
            let subjects=await subjectRepository
                .createQueryBuilder('subject')
                .leftJoinAndSelect('subject.assignedToWorkflow','assignedToWorkflow')
                .where('assignedToWorkflow._id= :wokflowId',{wokflowId:workflow._id})
                .getMany()
            //await Subject.find({assignedToWorkflow:workflow.id})
            subjects.forEach((subject)=>{
                result.add(subject)
            })
        }
    
        return Array.from(result)//await Subject.find({canBeInitiatedByRole:role})
    }

}


/* 









*/