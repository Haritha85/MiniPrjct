import { DataSource, Repository } from "typeorm";
import AppDataSource from "../Datasource/datasource"
import { Customer } from "../Entities/Customer.entity";
import { error } from "console";
import { Order } from "../Entities/Order.entity";
import { Supplier } from "../Entities/Supplier.entity";
import order_service from "./order_service";
import supplierService from "../Services/supplier_service";
class customer_Service{
    private customerrepo=AppDataSource.getRepository(Customer);
    private supplierrepo=AppDataSource.getRepository(Supplier);

    async getAllCustomers()
    {
        return await this.customerrepo
           .createQueryBuilder("customer")
           .leftJoinAndSelect("customer.orders", "orders")
           .leftJoinAndSelect("customer.supplier","supplier")
           .leftJoinAndSelect("customer.custinfo","custinfo")

           .orderBy("customer.customer_id","ASC")
           .getMany();
    }

    async getCustomerById(id:any)
    {
       return await this.customerrepo.findOne({
            where:{customer_id:id},
            relations:["orders","supplier","custinfo"]
        })
    }
    async createCustomer(firstName:string,lastName:string,city:string,country:string,phone:string,order:{orderDate:string,totalAmount:number,Complted:boolean}[],suppliers: { companyName: string, contactName: string, city: string, country: string, phone: string }[])
    {
        
        
        const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
              throw new Error(
                "Invalid phone number format. Phone number must contain 10 digits."
              );
            }
        const existingUser=await this.customerrepo.findOne({where:{firstName,lastName}});
        if(existingUser)
        {
            throw new Error("Customer already exists");
        }
        
        console.log("Creating new customer");
        const newCustomer=new Customer();
        newCustomer.firstName=firstName;
        newCustomer.lastName=lastName;
        newCustomer.city=city;
        newCustomer.country=country;
        newCustomer.phone=phone;
        if(order){
            newCustomer.orders = order.map((orderData: any) => {
                const order = new Order();
                order.orderDate = orderData.orderDate;
                order.totalAmount = orderData.totalAmount;
                order.Complted = orderData.Complted;
                return order;
              });
        }
        if(suppliers)
        {
          newCustomer.supplier = suppliers.map((supplierData: any) => {
            const supplier = new Supplier();
            supplier.companyName = supplierData.companyName;
            supplier.contactName = supplierData.contactName;
            supplier.city = supplierData.city;
            supplier.country = supplierData.country;
            supplier.phone = supplierData.phone;
            return supplier;
          });
        }
       
        return this.customerrepo.save(newCustomer);


    }
    async updateCustomer(customer_id:number,updateData:any)
    {
       
    const { suppliers,orders,...customerDetails}=updateData
    if (!customer_id) {
      throw new Error("Customer ID is required");
    }
    const existingCustomer = await this.customerrepo.findOne({where:{customer_id}});
    if (!existingCustomer) {
      throw new Error("Customer not found");
    }
    console.log("Updating the customer")
    const res=await this.customerrepo.update(customer_id,customerDetails);
    console.log(res)
    if(orders && orders.length>0){
      for(const order of orders){
        const { order_id, ...orderDetails } = order;
        return await order_service.updateOrder(order_id, orderDetails);
      }
    }
    if (suppliers && suppliers.length > 0) {
      for (const supplier of suppliers) {
        const { supplier_id, ...supplierDetails } = supplier;
        console.log(`Updating supplier with ID ${supplier_id}`);
        // Assuming you have a method like updateSupplier in your supplier_service
        await supplierService.updateSupplier(supplier_id, supplierDetails);
      }

    }
  }
    async deleteCustomer(customer_id:number)
    {
        const customer= await this.customerrepo.findOne({where:{customer_id}})
        if(!customer)
        {
          throw new Error(`Customer with ID ${customer_id} not found`);

        }
        customer.supplier=[];
        await this.customerrepo.save(customer);
        await this.customerrepo.remove(customer);

    }
    
}

export default new customer_Service;





