import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken' 
import { AppDataSource } from '../data-source';
import { UserActiveDir } from '../entity/UserActiveDir';
import UserActiveDirServices from './UserActiveDirServices';
import { InvalidToken } from '../entity/InvalidToken';

const key='QwD457808756_A_D!@#cckznn%$*';
const resetKey='BHJBHJxmal7y7887#NJIU$^(';
const userActiveDirRepository = AppDataSource.getRepository(UserActiveDir)


export class UserServices{

    static async register(email:string,password:string){

        let user=await userActiveDirRepository.findOneBy({email:email})
        if (!user){
            throw new Error('User first must be created by admin!')
        }
        if (user.hashedPass&&user.hashedPass!=='aaa'){
            throw new Error('User already exists!')
        }
    
        const hashedPass=await bcrypt.hash(password,10)
        user.hashedPass=hashedPass
        const registeredUser=await UserActiveDirServices.editUser(user._id.toString(),user)
        let token=this.createToken(registeredUser,key);
    
        return {_id:registeredUser._id,accessToken:token,email:registeredUser.email,role:registeredUser.role}
    
    }
    
    static async login(email,password){
        let user=await userActiveDirRepository.findOneBy({email:email})
        if (!user){
            throw new Error('Wrong username or password!');
        }
        let checkPass=await bcrypt.compare(password,user.hashedPass);
        if(!checkPass){
            throw new Error('Wrong username or password!')
        }
        let token=this.createToken(user,key);
        
        if (user.userStatus=='Inactive'){
            throw new Error('User is not active. Please contact administrator!')
        }
        return{_id:user._id,accessToken:token,email:user.email,role:user.role}
    }
    
    /*async function createResetPassToken(email){
        const user=await User.findOne({email:email})
        if(!user){
            throw new Error('Your email does not exist in the database!')
        }
        let token=createToken(user,resetKey);
        return {resetToken:token,email:user.email,_id:user._id,role:user.role}
    }
    
    async function changePassword(user,password){
        let userDB=await User.findById(user._id);
        if (!userDB){
            throw new Error('User do not exist!')
        }
        hashedPass=await bcrypt.hash(password,10);
        userDB.hashedPass=hashedPass;
        userDB.save();
        let token=createToken(userDB,key);
    
        return {_id:userDB._id,accessToken:token,email:userDB.email,role:userDB.role}
    }*/
    
    private static createToken(user,key){
        const payload={_id:user._id,email:user.email,role:user.role,finCenter:user.finCenter}
        let token=jwt.sign(payload,key);
        return token
    }
    
    static async verifyToken(req,res,tokenString?){
        const invalidTokenRepository=AppDataSource.getRepository(InvalidToken)
    
        let token=req.headers['x-authorization'];
    
        if(await invalidTokenRepository.findOne({where:{token:tokenString}})||
            await invalidTokenRepository.findOne({where:{token:token}})){
            return 'Invalid token'
        }
        if(tokenString){
            try {
                let userDataFromToken=jwt.verify(tokenString,resetKey);
                let user=await UserActiveDirServices.getActiveDirUserByEmail(userDataFromToken.email);
                if(!user){
                    throw new Error('Invalid token')
                }
                if (user.userStatus=='Inactive'){
                    throw new Error ('User is no longer active. Please contact admin.')
                }
                delete user.hashedPass
                return user
            } catch (error) {
                throw error
            }
        }
    
        if (!token){
            return 'No user'
        }else{
            try {
                let userDataFromToken=jwt.verify(token,key);
                let user=await UserActiveDirServices.getActiveDirUserByEmail(userDataFromToken.email);
                if(!user){
                    throw new Error('Invalid token')
                }
    
               if (user.userStatus=='Inactive'){
                throw new Error ('User is no longer active. Please contact admin.')
            }
                delete user.hashedPass
                return user
            } catch (error) {
                return 'Invalid token'
            }
            
        }
    }



}



//module.exports={register,verifyToken,login,createResetPassToken,changePassword,key}