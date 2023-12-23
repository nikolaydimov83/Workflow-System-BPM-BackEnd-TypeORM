import { AppDataSource } from "../data-source"
import { Role } from "../entity/Role"
import { NextFunction, Request, Response } from "express"

export class RoleController {

    private roleRepository = AppDataSource.getRepository(Role)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.roleRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.roleRepository.findOne({
            where: { _id:id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { roleName } = request.body;
        const role = Object.assign(new Role(), {
            roleName
        })

        return this.roleRepository.save(role)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let roleToRemove = await this.roleRepository.findOneBy({ _id:id })

        if (!roleToRemove) {
            return "this user not exist"
        }

        await this.roleRepository.remove(roleToRemove)

        return "user has been removed"
    }

}