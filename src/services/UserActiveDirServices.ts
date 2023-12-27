import { AppDataSource } from "../data-source"
import { UserActiveDir, UserStatus } from "../entity/UserActiveDir"


export default class UserActiveDirServices {

    

    static async  getAllActiveDirUsers() {
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)
        return userActiveDirRepository.find({relations:["role"]})
    }

    static async getActiveDirUserByID(id:number) {
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)
        const user = await userActiveDirRepository.findOne({
            where: { _id:id },
            relations:["role"]
        })
        return user
    }

    static async getActiveDirUserByEmail(email:string) {
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)
        const user = await userActiveDirRepository.findOne({
            where: { email:email},
            relations:["role"]
        })
        return user
    }

   static async createUser(newUser) {
        const { email, branchNumber, branchName,userStatus,role } = newUser;
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)
        const parsedUserStatus=userStatus as UserStatus
        const user = Object.assign(new UserActiveDir(), {
            email,
            branchNumber:+branchNumber,
            branchName,
            userStatus:parsedUserStatus,
            role:role
        })

        return userActiveDirRepository.save(user)
    }



    static async editUser(id:string,userInfo:UserActiveDir,){
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir);
        const idNum=parseInt(id)
        const userToUpdate=await userActiveDirRepository.findOne({where:{_id:idNum}});
        Object.assign(userToUpdate,userInfo)
       return userActiveDirRepository.save(userToUpdate);
        

    }
}