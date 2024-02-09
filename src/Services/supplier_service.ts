import AppDataSource from "../Datasource/datasource";
import { Product } from "../Entities/Product.entity";
import { Supplier } from "../Entities/Supplier.entity";
import product_service from "./product_service";
import customer_service from "./customer_service";
import { Customer } from "../Entities/Customer.entity";

class supplierService{
    private supplierrepo=AppDataSource.getRepository(Supplier);
    private productreppo=AppDataSource.getRepository(Product);
    async getAllSuppliers(){
        return await this.supplierrepo.find({
            relations:["products","customers"]
        });
    }

    async getSupplierById(id:number)
    {
        return await this.supplierrepo.findOne({
            where:{supplier_id:id},
            relations:["products","customers"]
        })
    }
    async createSupplier(companyName:string,contactName:string,city:string,country:string,phone:string,products:{productName:string,unitPrice:number,packagename:string,isDiscontinued:string}[],customers: { firstName: string, lastName: string,city:string,country:string,phone:string }[])
      
    {
        const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
              throw new Error(
                "Invalid phone number format. Phone number must contain 10 digits."
              );
            }
            const existingSupplier=await this.supplierrepo.findOne({where:{companyName}});
        if(existingSupplier)
        {
            throw new Error("Supplier already exists");
        }
        
        const newSupplier=new Supplier();
        newSupplier.companyName=companyName;
        newSupplier.contactName=contactName;
        newSupplier.city=city;
        newSupplier.country=country;
        newSupplier.phone=phone;
        if(products)
        {
            newSupplier.products=products.map((productData:any) =>{
                const product=new Product();
                product.productName=productData.productName;
                product.unitPrice=productData.unitPrice;
                product.packagename=productData.packagename;
                product.isDiscontinued=productData.isDiscontinued;
                return product;
            });
        }
        if(customers&&customers.length>0)
        {
          newSupplier.customers = customers.map((customerData: any) => {
            const customer = new Customer();
            customer.firstName = customerData.firstName;
            customer.lastName = customerData.lastName;
            customer.city=customerData.city;
            customer.country=customerData.country;
            customer.phone=customerData.phone;
            return customer;
          });
        }
        
        return this.supplierrepo.save(newSupplier);
    }

    async updateSupplier(supplier_id:number,updateData:any)
    {
        if (!supplier_id) {
      throw new Error("Supplier ID is required");
           }
    const existingSupplier = await this.supplierrepo.findOne({where:{supplier_id}});
    if (!existingSupplier) {
      throw new Error("Supplier not found");
    }
    const { customers,products,...supplierDetails}=updateData

    console.log("Updating the Supplier")
    await this.supplierrepo.update(supplier_id,supplierDetails);
    if (customers && customers.length > 0) {
      for (const customer of customers) {
        const { customer_id, ...customerDetails } = customer;
        console.log(`Updating customer with ID ${customer_id}`);
        await customer_service.updateCustomer(customer_id, customerDetails);
      }
    }
    if(products && products.length>0){
      for(const product of products){
        const { product_id, ...productDetails } = product;
        console.log(`Updating product with ID ${product_id}`);
        return await product_service.updateProduct(product_id, productDetails);

      }
    }
  }

  async deleteSupplier(supplier_id:number)
  {
    const supplier =await this.supplierrepo.findOne({where:{supplier_id:supplier_id}});
    if(!supplier)
        {
          throw new Error(`Customer with ID ${supplier_id} not found`);

        }
        supplier.customers = [];

        await this.supplierrepo.save(supplier);
        await this.supplierrepo.remove(supplier);
     }
}

export default new supplierService;