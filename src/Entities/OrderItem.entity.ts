import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order.entity";
import { Product } from "./Product.entity";
@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    orderItem_id:number
    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;
    @Column()
    quantity: number;
    @Column()
    unitPrice: number;
    @ManyToOne(() => Product, (product) => product.orderItems,{onDelete:"CASCADE"})
    product: Product;
}