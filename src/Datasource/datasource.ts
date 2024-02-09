import { DataSource } from "typeorm";
import {Customer} from "../Entities/Customer.entity"
import { Order } from "../Entities/Order.entity";
import { Custinfo } from "../Entities/Custinfo.entity";
import { OrderItem } from "../Entities/OrderItem.entity";
import { Product } from "../Entities/Product.entity";
import { Supplier } from "../Entities/Supplier.entity";
const AppDataSource=new DataSource({
    type:"mssql",
    host:"localhost",
    port:1433,
    username:"sa",
    password:"Haritha123",
    database:"Project",
    logging:true,
    synchronize:false,
    
    //entities:[Customer,Order,Custinfo,OrderItem,Product,Supplier],
    entities:["dist/Entities/*.entity.js"],
    migrations:["dist/migrations/*.js"],
   
    
    options: {
        
        trustServerCertificate: true
      },
      requestTimeout:300000,

});

export default AppDataSource;