import * as express from "express"
import { AppDataSource } from "./data-source";
import { routes } from "./routes";
import * as cors from 'cors'
import corsOprions from "./middlewares/cors"
import verifyToken from "./middlewares/jwt";
import * as cron from 'node-cron'
import { cronIapplyReplacer } from "./utils/cronSchedulerFunctions";

AppDataSource.initialize().then(async () => {
    
    cron.schedule('07 00 * * *', cronIapplyReplacer, {
        scheduled: true,
        timezone: 'Europe/Sofia'
      });

    // create express app
    const app = express()
    app.use(express.json())
    app.use(cors(corsOprions))
    app.use(verifyToken())
    routes(app);
    app.listen(3000);
    
    // insert new users for test


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
