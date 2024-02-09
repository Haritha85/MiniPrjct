import { Column, Entity, OneToMany, PrimaryGeneratedColumn,ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product.entity";
import { Customer } from "./Customer.entity";
 
@Entity()
export class Supplier{
    @PrimaryGeneratedColumn()
    supplier_id:number
    @Column()
    companyName:string
    @Column()
    contactName:string
    @Column()
    city:string
    @Column()
    country:string
    @Column()
    phone:string
    @OneToMany(() => Product, (product) => product.supplier,{cascade:true})
    products: Product[];
    @ManyToMany(()=>Customer,(customer)=>customer.supplier,{cascade:true})
    @JoinTable()
    customers:Customer[];
}