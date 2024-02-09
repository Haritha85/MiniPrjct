import { Column,PrimaryGeneratedColumn,OneToOne,JoinColumn, Entity } from "typeorm";
import { Customer } from "./Customer.entity";
@Entity()
export class Custinfo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    additionalinfo:string

    @OneToOne(()=>Customer,(customer)=>customer.custinfo,{onDelete:"CASCADE"})
    @JoinColumn()
    customer:Customer;
}