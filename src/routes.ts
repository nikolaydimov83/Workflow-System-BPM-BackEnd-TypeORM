import {adminUsersRightsControler} from './controllers/adminUsersRightsControler';
import { workflowController } from './controllers/workflowController';
import {authController} from "./controllers/authController";
/*const changeIapplyController = require("./controllers/changeIapplyController");
const changeStatusController = require("./controllers/changeStatusController");
const commentsController = require("./controllers/commentsController");
const createController = require("./controllers/createController");
const dataController = require("./controllers/dataController");
const editController = require("./controllers/editController");
const iApplyConroller = require("./controllers/iapplyDataController");
const reportsContoller = require("./controllers/reportsController");
const searchController = require("./controllers/searchController");
const unknownController = require("./controllers/unknownController");
const workflowController = require("./controllers/workflowController");*/

export const routes=(app)=>{
    app.use('/admin',adminUsersRightsControler);
    app.use('/workflow',workflowController);
    app.use('/users',authController);
    /*app.use('/data/catalog',dataController);
    app.use('/data/create',createController);
    app.use('/data/edit',editController);
    app.use('/iApply',iApplyConroller);
    app.use('/data/changeStatus',changeStatusController);
    app.use('/comments',commentsController);
    app.use('/search',searchController);
    app.use('/reportsController',reportsContoller);
    app.use('/changeIApply',changeIapplyController);
    app.use('/workflow',workflowController);
    app.use('*',unknownController);*/
    

}