import { MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserActiveDir } from "./UserActiveDir";

@Entity()

export class Role{
    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:"varchar"
        
    })
    @MinLength(1)
    roleName:string
    
    @OneToMany(
        ()=>UserActiveDir, (user:UserActiveDir) => user.role
        
    )
    users:UserActiveDir[]
}

/*const rolesSchema=new Schema({
    role:{type:String,unique:true},
    roleCreateDate:{type:Date,default:Date.now,immutable:true},
    roleType:{type:String, enum:["Branch","HO"],required:true},
    roleName:{type:String,required:true}
});*/