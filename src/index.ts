import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source";
import { User } from "./entity/User"
import { UserActiveDir, UserStatus } from "./entity/UserActiveDir"
import { validate } from "class-validator"
import { routes } from "./routes";
import { Role } from "./entity/Role";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())
    routes(app);
    app.listen(3000);
    
    // insert new users for test


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
