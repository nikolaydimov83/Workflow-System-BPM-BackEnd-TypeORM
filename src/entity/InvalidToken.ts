import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class InvalidToken{
    @PrimaryGeneratedColumn()
    _id:number

    @Column({
        type:"varchar",unique:true, collation: 'utf8_unicode_ci'
    })
    token:string
}