import * as express from "express"
import { AppDataSource } from "./data-source";
import { routes } from "./routes";


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())
    routes(app);
    app.listen(3000);
    
    // insert new users for test


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
