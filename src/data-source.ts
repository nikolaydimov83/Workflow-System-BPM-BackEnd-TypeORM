import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { UserActiveDir } from "./entity/UserActiveDir"
import { Role } from "./entity/Role"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    username: "sa",
    password: "MimiNiki2012",
    database: "tempdb",
    synchronize: true,
    logging: false,
    entities: [User,UserActiveDir,Role],
    migrations: [],
    subscribers: [],
    options: {
        "enableArithAbort": true,
        "encrypt": false 
      }
})
