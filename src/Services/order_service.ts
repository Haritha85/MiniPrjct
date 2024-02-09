import { DataSource, Repository } from "typeorm";
import AppDataSource from "../Datasource/datasource"
import { Order } from "../Entities/Order.entity";
import { Customer } from "../Entities/Customer.entity";
import { OrderItem } from "../Entities/OrderItem.entity";
// import orderitem_service from "./orderitem_service";

class orderService{
    private orderrepo=AppDataSource.getRepository(Order);
    private customerrepo=AppDataSource.getRepository(Customer);
    private orderitemrepo=AppDataSource.getRepository(OrderItem);
    async getAllOrders(){
        return await this.orderrepo.find({
            relations:["customer","orderItems"]
        });
    }
    async getOrderById(id:any)
    {
        return await this.orderrepo.findOne({
            where:{order_id:id},
            relations:["customer","orderItems"]
        });
    }
    async createOrders(customer_id:number, Complted:boolean,orderItem ?:OrderItem[]){
        const customer=await this.customerrepo.findOne({where:{customer_id}})
        if(!customer){
            throw new Error("Customer not found")
        }
        console.log("Creating new order")
        const order = new Order()
        order.orderDate = new Date()
        order.totalAmount = 0
        order.Complted=Complted;
        order.customer = customer
        if(orderItem){
            order.orderItems = orderItem.map((orderItemData : any)=>{
                const newOrderItem = new OrderItem()
                newOrderItem.quantity = orderItemData.quantity
                newOrderItem.unitPrice = orderItemData.unitPrice
                order.totalAmount += newOrderItem.quantity * newOrderItem.unitPrice
                return newOrderItem
            })
        }
        const createdOrder= await this.orderrepo.save(order)
        console.log(createdOrder)
        return createdOrder
    }
    
    async addOrderitemsByIdtoorder(customerid: number, Complted: boolean, orderItemIds?: any[]) {
        const existingCustomer = await this.customerrepo.findOne({
            where: { customer_id: customerid }
        });
    
        if (!existingCustomer) {
            throw new Error("Customer not found");
        }
    
        const order = new Order();
        order.orderDate = new Date();
        order.totalAmount = 0;
        order.Complted = Complted;
        order.customer = existingCustomer;
        if (orderItemIds) {
            const orderItems = await Promise.all(orderItemIds.map(async (orderItemId) => {
                const existingOrderItem = await this.orderitemrepo.findOne({ where: { orderItem_id: orderItemId } });
                if (!existingOrderItem) {
                    throw new Error(`OrderItem with ID ${orderItemId} not found`);
                }
                return existingOrderItem;
            }));
            console.log("orderItems:", orderItems);
            orderItems.forEach((item) => {
                order.totalAmount += item.quantity * item.unitPrice;
            });
        
            order.orderItems = orderItems;
        }
        const createdOrder = await this.orderrepo.save(order);
        console.log(createdOrder);
        return createdOrder;
    }
    
     async updateOrder(orderId: number,updateOrder:any) {
       
        const existingOrder=await this.orderrepo.findOne({
            where:{order_id:orderId}
        })
        if (!existingOrder) {
          throw new Error("Order not found");
        }
        console.log("Updating the order")
        await this.orderrepo.update(orderId,updateOrder);
      
      }
      
     async deleteorder(order_id:number)
     {
        const order=await this.orderrepo.findOne({
            where:{order_id},
            //relations:["orders"]
           });
           if(!order)
           {
            throw new Error("order with ID ${order} not found");
           }
           order.orderItems = [];
           await this.orderrepo.save(order);

           await this.orderrepo.remove(order);
     }


}

export default new orderService;