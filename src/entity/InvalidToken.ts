import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class InvalidToken{
    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:"varchar",unique:true, collation: 'SQL_Latin1_General_CP1_CI_AS'
    })
    token:string
}