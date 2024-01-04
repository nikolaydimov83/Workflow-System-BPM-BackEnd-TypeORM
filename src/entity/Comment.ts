import { MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { checkInput } from "../utils/checkInput";
import { UserActiveDir } from "./UserActiveDir";

@Entity()
export class Comment{

@PrimaryGeneratedColumn()
_id:number

@Column({type:'varchar'})
@MinLength(1)
body:string

@CreateDateColumn()
commentDate:Date

@ManyToOne(()=>UserActiveDir, (user)=>user._id)
commentOwner:UserActiveDir

@BeforeInsert()
@BeforeUpdate()
async checkBeforeUpdate(){
    await checkInput(this)
}
}

/*const { Schema, model,Types } = require("mongoose");


const requestCommentSchema=new Schema({
    body:{type:String, required:true},
    commentDate:{type:Date, default:Date.now, immutable:true},
    commentOwner:{type:Types.ObjectId, ref:'User'}
});

requestCommentSchema.index({commentOwner:1},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Comment=model('Comment', requestCommentSchema);

module.exports=Comment; */