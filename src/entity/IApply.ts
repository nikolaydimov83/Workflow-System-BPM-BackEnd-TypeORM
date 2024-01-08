/*const { Schema, model } = require("mongoose")

const iApplyShema=new Schema({ iApplyId: String, clientName: String, 
                                clientEGFN: String,product:String,
                                amount:Number,ccy:String,
                                finCenter:Number,refferingFinCenter:Number})

const IApply=model('IApply', iApplyShema, 'iApplyData'); 

module.exports=IApply*/

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class IApply{

    @PrimaryColumn()
    iApplyId:string  
    
    @Column()
    clientName:string

    @Column()
    clientEGFN:string

    @Column()
    product:string

    @Column()
    amount:number

    @Column()
    ccy:string

    @Column()
    finCenter:number    

    @Column()
    refferingFinCenter:number 
}
