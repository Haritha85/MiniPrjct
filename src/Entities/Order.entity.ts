
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer.entity";
import { OrderItem } from "./OrderItem.entity";
@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    order_id:number
    @Column()
    orderDate:Date
    @Column()
    totalAmount: number;
    @Column()
    Complted:boolean;
    @ManyToOne(() => Customer, (customer) => customer.orders,{onDelete:"CASCADE"})
    customer: Customer;
    @OneToMany(()=>OrderItem,(orderItem)=>orderItem.order,{cascade:true})
    orderItems:OrderItem[]
    
}