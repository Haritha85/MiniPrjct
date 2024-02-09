import AppDataSource from "../Datasource/datasource";
import { Customer } from "../Entities/Customer.entity";
import { Order } from "../Entities/Order.entity";
import { OrderItem } from "../Entities/OrderItem.entity";
import { Product } from "../Entities/Product.entity";
import customer_service from "../Services/customer_service";
import orderitemService from "../Services/orderitem_service";
import orderService from "../Services/order_service";
class addfeatures{
    private customerrepo=AppDataSource.getRepository(Customer);
    private orderrepo=AppDataSource.getRepository(Order);
    private productrepo=AppDataSource.getRepository(Product);

    async getActiveOrdersForCustomer(customer_id:number)
    {
       const activeOrders=await this.orderrepo.find({
            where:{
                customer:{customer_id:customer_id},
                Complted:false,
            },
            relations:["orderItems"]
        });
        const activeOrdercount=activeOrders.length;
        
        return {activeOrdercount,activeOrders};
    }
    async getNumberOfOrders(customer_id : number){
        console.log(customer_id)
        const customer = await this.customerrepo.findOne({
            where: { customer_id },
            relations: ["orders"],
          });
     
          if (!customer) {
            throw new Error(`Customer with ID ${customer_id} not found`);
          }
          console.log("hii")
          const numberOfOrders = customer.orders.length;
          console.log(`Number of orders for customer ${customer_id}: ${numberOfOrders}`);
          return numberOfOrders;
    }
    async creatingOrders(customer_id: number,Complted:boolean, products: any) {
        const customer = await this.customerrepo.findOne({where:{customer_id}});
        if (!customer) {
          throw new Error(`Customer with ID ${customer_id} not found`);
        }
        console.log(customer)
        let orderItemsData = [];
        console.log(products)
        for(let index=0;index<products.length;index++)
        {
            let productName=products[index].productName
            let quantity=products[index].quantity
        
          const product = await this.productrepo.findOne({ where: { productName } });
          console.log(product);
          if (!product) {
              throw new Error(`Product with name ${productName} not found`);
          }
          const product_id = product.product_id;
          console.log(`ProductId is ${product_id}`);
          const createdOrderItem = await orderitemService.createOrderItem(quantity,product_id);
          console.log(createdOrderItem);
          orderItemsData.push(createdOrderItem);
        }
        console.log(orderItemsData)
        const createdOrder = await orderService.createOrders(customer_id,Complted,orderItemsData);
        console.log(createdOrder);
        return createdOrder;
    }

   
}
export default new addfeatures;