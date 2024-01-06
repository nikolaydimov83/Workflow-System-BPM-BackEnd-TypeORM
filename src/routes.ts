import {adminUsersRightsControler} from './controllers/adminUsersRightsControler';
import { workflowController } from './controllers/workflowController';
import {authController} from "./controllers/authController";
import { createController } from './controllers/createController';
import { dataController } from './controllers/dataController';

export const routes=(app)=>{
    app.use('/admin',adminUsersRightsControler);
    app.use('/workflow',workflowController);
    app.use('/users',authController);
    app.use('/data/create',createController);
    app.use('/data/catalog',dataController);
    
    /*app.use('/data/edit',editController);
    app.use('/iApply',iApplyConroller);
    app.use('/data/changeStatus',changeStatusController);
    app.use('/comments',commentsController);
    app.use('/search',searchController);
    app.use('/reportsController',reportsContoller);
    app.use('/changeIApply',changeIapplyController);
    app.use('/workflow',workflowController);
    app.use('*',unknownController);*/
    

}