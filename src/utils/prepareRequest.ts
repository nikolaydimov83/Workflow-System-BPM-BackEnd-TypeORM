import { StatusServices } from "../services/StatusServices";
import { SubjectServices } from "../services/SubjectServices";

async function prepareBodyForRequestCreate(req) {
    let body = req.body;
    let iApplyId = body.iApplyId;
    let requestWorkflow = await SubjectServices.findWorkflowBySubjectId(body.subjectId);
    if (!requestWorkflow){
        throw new Error('The subject you are chising does not correspond to any Workflow!')
    }
    body.requestWorkflow = requestWorkflow._id;
    body.status = await StatusServices.getStatusById(requestWorkflow.allowedStatuses[0]._id);
    body.statusIncomingDate = (new Date())
    body.statusSender = req.user.email;
    body.history = [];
    let historyEntry = { status: body.status, incomingDate: body.statusIncomingDate, statusSender: req.user.email };
    body.history.push(historyEntry);

    /*let iApplyData = await readIapplyData(iApplyId);
    body.amount = iApplyData.amount;
    body.ccy = iApplyData.ccy;
    body.clientEGFN = iApplyData.clientEGFN;
    body.clientName = iApplyData.clientName;
    body.finCenter = iApplyData.finCenter;
    body.iApplyId = iApplyData.iApplyId;
    body.product = iApplyData.product;
    body.refferingFinCenter = iApplyData.refferingFinCenter;
    body.requestCreatorEmail=req.user.email;*/
    return body;
}