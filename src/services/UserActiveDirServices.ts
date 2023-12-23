import { AppDataSource } from "../data-source"
import { UserActiveDir } from "../entity/UserActiveDir"


export default class UserActiveDirServices {

    

    static async  getAllActiveDirUsers() {
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)
        return userActiveDirRepository.find()
    }

    async getActiveDirUserByID(id:number) {
        const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)
        const user = await userActiveDirRepository.findOne({
            where: { _id:id }
        })
        return user
    }

   /* async createUser(newUser) {
        const { email, branchNumber, branchName,userStatus,role } = newUser;
        
        const parsedUserStatus=userStatus as UserStatus
        const user = Object.assign(new UserActiveDir(), {
            email,
            branchNumber:+branchNumber,
            branchName,
            userStatus:parsedUserStatus,
            role:+role 
        })

        return this.userActiveDirRepository.save(user)
    }*/

    /*async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userActiveDirRepository.findOneBy({ _id:id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userActiveDirRepository.remove(userToRemove)

        return "user has been removed"
    }
*/
}