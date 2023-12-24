import { IsEnum, MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserActiveDir } from "./UserActiveDir";
import { checkInput } from "../utils/checkInput";

enum RoleType{
    Branch="Branch",
    HO="HO"
}

@Entity()

export class Role{
    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:"varchar"
        
    })
    @MinLength(1)
    roleName:string

    @Column({
        type:"varchar",
        default:'Active'
    })
    @IsEnum(RoleType,{message:"Invalid Role Type - should be Branch or HO"})
    roleType:RoleType


    @Column({
        type:"varchar",
        unique: true,
        collation:'SQL_Latin1_General_CP1_CI_AS',
    
    })
    role:string

    @CreateDateColumn()
     
    roleCreateDate:Date
    
    @UpdateDateColumn()

    roleUpdateDate:Date

   /* @OneToMany(
        ()=>UserActiveDir, (user:UserActiveDir) => user.role
        
    )
    @JoinColumn()
    users:UserActiveDir[]*/

    @BeforeInsert()
    @BeforeUpdate()
        updateRole() {
            checkInput(this);
            if (this.roleType==="Branch"){
                this.role = this.roleType+this.roleName

            }else{
                this.role = this.roleName
            }

            }
}

/*const rolesSchema=new Schema({
    role:{type:String,unique:true},
    roleCreateDate:{type:Date,default:Date.now,immutable:true},
    roleType:{type:String, enum:["Branch","HO"],required:true},
    roleName:{type:String,required:true}
});*/