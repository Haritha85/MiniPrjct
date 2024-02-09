import express from 'express';
import "reflect-metadata";
import router from "./Controller/customer_control"
import AppDataSource from './Datasource/datasource';
import router1 from './Controller/custinfo_control';
import router2 from './Controller/order_control';
import router3 from './Controller/product_control';
import router4 from './Controller/orderitem_control';
import router5 from './Controller/supplier_control';
import router6 from './Controller/additionalfeatures_control'
const app:express.Application=express();
 
app.use(express.json());
app.use('/customer',router);
app.use('/custinfo',router1);
app.use('/order',router2);
app.use('/product',router3);
app.use('/orderitem',router4);
app.use('/supplier',router5);
app.use('/additional',router6);
AppDataSource.initialize()
  .then(() => {
    console.log("connected")
  })
  .catch((err) => console.log("error while connecting",err));
app.listen(3000,()=>
{
    console.log("running");
})
