import { AppDataSource } from "../data-source"
import { Comment } from "../entity/Comment"
import { createEntityInstance } from "./factories/createEntityInstanceFactory"

const commentRepository=AppDataSource.getRepository(Comment)

export class CommentServices{
    static async createCommnet(body,user){
        body.commentOwner=user._id
        const comment=createEntityInstance(Comment,body)
        return await commentRepository.save(comment)
    }

}

