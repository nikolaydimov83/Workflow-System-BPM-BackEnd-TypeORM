import { AppDataSource } from "../data-source";
import { Subject } from "../entity/Subject";
import { WorkflowServices } from "./WorkflowServices";
import { createEntityInstance } from "./factories/createEntityInstanceFactory";

const subjectRepository=AppDataSource.getRepository(Subject)

export class SubjectServices{

    static async getAllSubjects(){
        return await subjectRepository.find({relations:['assignedToWorkflow']})
    }

    static async getSubjectById(id){
        return subjectRepository.findOne({where:{_id:id},relations:['assignedToWorkflow']})
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

}
/* 



async function findWorkflowBySubjectId(subjectId){
    let subject=await Subject.findById(subjectId).populate('assignedToWorkflow');
    return subject.assignedToWorkflow
}

async function findAllSubjectsByRole(role){
    let allWorkflows=await Workflow.find({}).populate('initialStatus');
    let workflows=allWorkflows.filter((workflow)=>workflow.initialStatus.statusType.toString()==role.toString());
    let result=new Set()

    for (const workflow of workflows) {
        let subjects=await Subject.find({assignedToWorkflow:workflow.id})
        subjects.forEach((subject)=>{
            result.add(subject)
        })
    }

    return Array.from(result)//await Subject.find({canBeInitiatedByRole:role})
}



*/