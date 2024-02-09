import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,ManyToMany,JoinTable} from "typeorm";
import { Order } from "./Order.entity";
import { Custinfo } from "./Custinfo.entity";
import { Supplier } from "./Supplier.entity";
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column({nullable:true})
  phone: string;
  @OneToMany(() => Order, (order) => order.customer,{cascade:true})
  orders: Order[];
  @OneToOne(()=>Custinfo,(custinfo)=>custinfo.customer,{onDelete:"CASCADE"})
  custinfo:Custinfo;
  @ManyToMany(()=>Supplier,(supplier)=>supplier.customers)
  supplier:Supplier[];
}