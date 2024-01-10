import {Router} from 'express';
import UserActiveDirServices from '../services/UserActiveDirServices';
import { SubjectServices } from '../services/SubjectServices';
import { Subject } from '../entity/Subject';
import { RequestServices } from '../services/RequestServices';
import { parseError } from '../utils/utils';
import { IApplyServices } from '../services/IApplyServices';


export const createController=Router();

createController.post('/',async (req,res)=>{
   
    try {
        
        //let body = await prepareBodyForRequestCreate(req);
        let activeDirUser=await UserActiveDirServices.getActiveDirUserByID(req.user._id);
        let subjects=await SubjectServices.findAllSubjectsByRole(activeDirUser.role)
        if (subjects.findIndex(
                (subject:Subject)=>
                    subject.assignedToWorkflow._id==parseInt(req.body.requestWorkflow))==-1){
                        throw new Error (`This user does not have the appropriate Role to initiate this type of Workflow`);
                    }

        let request=await RequestServices.createRequest(req.body);
        //let emailContent=prepareMailContent(request)
        //serverSendMail(emailAdress,req.user.email,emailSubjectForCreate,emailContent)
        res.status(201);    
        res.json({request});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})

async function prepareBodyForRequestCreate(req) {
    let body = req.body;
    let iApplyId = body.iApplyId;
    let requestWorkflow = await SubjectServices.findWorkflowBySubjectId(body.subjectId);
    if (!requestWorkflow){
        throw new Error('The subject you are chising does not correspond to any Workflow!')
    }
    body.requestWorkflow = requestWorkflow._id;
    let status = requestWorkflow.allowedStatuses[0];
    body.status = status;
    body.statusIncomingDate = (new Date())
    body.statusSender = req.user.email;

    body.history = [];

    let historyEntry = { status: status, incomingDate: body.statusIncomingDate, statusSender: req.user.email };
    body.history.push(historyEntry);

    let iApplyData = await IApplyServices.readIapplyData(iApplyId);
    body.amount = iApplyData.amount;
    body.ccy = iApplyData.ccy;
    body.clientEGFN = iApplyData.clientEGFN;
    body.clientName = iApplyData.clientName;
    body.finCenter = iApplyData.finCenter;
    body.iApplyId = iApplyData.iApplyId;
    body.product = iApplyData.product;
    body.refferingFinCenter = iApplyData.refferingFinCenter;
    body.requestCreatorEmail=req.user.email;
    return body;
}

/*const { Types } = require('mongoose');
const { serverSendMail, emailAdress, prepareMailContent } = require('../emailClient/mail');

const Request = require('../models/Request');
const Subject = require('../models/Subject');
const User = require('../models/User');
const { readIapplyData } = require('../services/iapplyServices');
const { createRequest } = require('../services/requestServices');
const { findWorkflowBySubjectId, findAllSubjectsByRole } = require('../services/subjectServices');
const { parseError } = require('../utils/utils');
const { getActiveDirUserByID } = require('../services/adminServices');
const createController=require('express').Router();

const emailSubjectForCreate='PlanB New Request Created'

createController.get('/',async (req,res)=>{
    try {
        let activeDirUser=await getActiveDirUserByID(req.user.userStaticInfo.toString());
        let subjects=await findAllSubjectsByRole(activeDirUser.role);//await Subject.find({canBeInitiatedByRole:activeDirUser.role});
        res.status(201);
        res.json({subjects});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})


//
module.exports=createController;

async function prepareBodyForRequestCreate(req) {
    let body = req.body;
    let iApplyId = body.iApplyId;
    let requestWorkflow = await findWorkflowBySubjectId(body.subjectId);
    if (!requestWorkflow){
        throw new Error('The subject you are chising does not correspond to any Workflow!')
    }
    body.requestWorkflow = requestWorkflow.id;
    let status = requestWorkflow.allowedStatuses[0];
    body.status = status.id.toString('hex');
    body.statusIncomingDate = (new Date())
    body.statusSender = req.user.email;

    body.history = [];

    let historyEntry = { status: status, incomingDate: body.statusIncomingDate, statusSender: req.user.email };
    body.history.push(historyEntry);

    let iApplyData = await readIapplyData(iApplyId);
    body.amount = iApplyData.amount;
    body.ccy = iApplyData.ccy;
    body.clientEGFN = iApplyData.clientEGFN;
    body.clientName = iApplyData.clientName;
    body.finCenter = iApplyData.finCenter;
    body.iApplyId = iApplyData.iApplyId;
    body.product = iApplyData.product;
    body.refferingFinCenter = iApplyData.refferingFinCenter;
    body.requestCreatorEmail=req.user.email;
    return body;
}*/
