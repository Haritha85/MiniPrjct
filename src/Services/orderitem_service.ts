import e from "express";
import AppDataSource from "../Datasource/datasource";
import { Order } from "../Entities/Order.entity";
import { OrderItem } from "../Entities/OrderItem.entity";
import { Product } from "../Entities/Product.entity";
class orderitemService{
    private orderitemrepo=AppDataSource.getRepository(OrderItem);
    private orderrepo=AppDataSource.getRepository(Order);
    private productrepo=AppDataSource.getRepository(Product);
    async getAllOrderitems(){
        return await this.orderitemrepo.find({
            relations:["order","product"]
        })
    }
    async getOrderitemById(id:any){
        return await this.orderitemrepo.findOne({
            where: { orderItem_id: id },
            relations: ["order","product"],
          });

    }
    async createOrderItem(quantity: number,product_id:number) {
        
          // const existingOrder = await this.orderrepo.findOne({
          //   where:{order_id:orderId}});
            const existingProduct=await this.productrepo.findOne({
                where:{product_id:product_id}
            });
        if (!existingProduct) {
          throw new Error("Product not found");
        }
    
        const newOrderItem = new OrderItem();
        // newOrderItem.order = existingOrder;
        newOrderItem.product=existingProduct;
        newOrderItem.quantity = quantity;
        newOrderItem.unitPrice =existingProduct.unitPrice;
        return await this.orderitemrepo.save(newOrderItem);
      }
      async updateOrderItem(orderItemId: number, updateOrderItem: any) {
        const existingOrderItem = await this.orderitemrepo.findOne({
          where: { orderItem_id: orderItemId },
        });
    
        if (!existingOrderItem) {
          throw new Error("Order item not found");
        }
    
        await this.orderitemrepo.update(orderItemId, updateOrderItem);
      }
      async deleteOrderItem(orderItemId: number) {
        const orderItem = await this.orderitemrepo.findOne({
          where: { orderItem_id: orderItemId },
        });
    
        if (!orderItem) {
          throw new Error(`Order item with ID ${orderItemId} not found`);
        }
    
        await this.orderitemrepo.remove(orderItem);
      }
}
export default new orderitemService;