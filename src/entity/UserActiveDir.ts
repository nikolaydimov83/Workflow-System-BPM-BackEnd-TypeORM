import { IsEnum, IsInt, Length, Max, Min, MinLength, Validate, isInt, validate } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { EmailValidator } from "../validators/validators"
import { Role } from "./Role"
export enum UserStatus {
    Active = 'Active',
    Inactive = 'Inactive',
  }

@Entity()

export class UserActiveDir{

    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:"varchar",
        unique: true,
        collation:'SQL_Latin1_General_CP1_CI_AS',
    
    })
    
    @Validate(EmailValidator)
    email:string

    @Column({
        type:"smallint",

    })
    @IsInt()
    @Min(1)
    @Max(999)

    branchNumber:number

    @Column({
        type:"varchar",

    })
    @MinLength(1)

    branchName:string
    
    @Column({type:"varchar"})
    @IsEnum(UserStatus, { message: 'Invalid user status' })
    userStatus:UserStatus

    @CreateDateColumn()
     
    createdAt:Date
    
    @UpdateDateColumn()

    updatedAt:Date
    
    @ManyToOne(
        () => Role, (role:Role) => role.users)
        role: Role

    private async checkInput() {
        const errors = await validate(this)
        errors.forEach((err)=>{
            console.log(err)
        })
        if (errors.length>0){
            throw errors
        }
    
     }

    
     @BeforeInsert()
        checkBeforeInsert(){
            this.checkInput()
        }

   

    @BeforeUpdate()
    checkBeforeUpdate(){
        this.checkInput()
    }
    


}


/*{
    email:{type:String,unique:true,required:true,validate:{
        validator:async (value)=>{
            let testForMatch=/^[A-Za-z0-9]+@postbank.bg$/.test(value);
            return testForMatch
            
        },
        message:(props)=>{return `Invalid pattern for email.` }
    }},
    branchNumber:{type:Number,required:true, min:1,max:999},
    branchName:{type:String,required:true},
    userStatus:{type:String, enum:['Active', 'Inactive']},
    role:{type:Types.ObjectId,ref:'Role',required:true}
}*/