import { AppDataSource } from "../data-source";
import { Request } from "../entity/Request";
import { stringToDate } from "../utils/datesParser";

const requestRepository=AppDataSource.getRepository(Request)
export class RequestServices{
    static async createRequest(newRequest) {
        const { requestWorkflow,deadlineDate } = newRequest;

        const request = Object.assign(new Request(), {
            requestWorkflow:parseInt(requestWorkflow),
            deadlineDate:stringToDate(deadlineDate)
        })

        return await requestRepository.save(request)
    }
}

/*async function createRequest(requestObject){
    return await (await Request.create(requestObject)).populate('status');
}*/