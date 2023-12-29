import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserActiveDir } from "./entity/UserActiveDir"
import { Role } from "./entity/Role"
import { InvalidToken } from "./entity/InvalidToken"
import { Status } from "./entity/Status"
import { Workflow } from "./entity/Workflow"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    username: "sa",
    password: "MimiNiki2012",
    database: "tempdb",
    synchronize: true,
    logging: false,
    entities: [UserActiveDir,Role, InvalidToken,Status, Workflow],
    migrations: [],
    subscribers: [],
    options: {
        "enableArithAbort": true,
        "encrypt": false 
      }
})
