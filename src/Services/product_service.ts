import AppDataSource from "../Datasource/datasource"
import { Product } from "../Entities/Product.entity"
import { OrderItem } from "../Entities/OrderItem.entity"
import { Supplier } from "../Entities/Supplier.entity";


class productService{
    private productrepo=AppDataSource.getRepository(Product);
    private supplierrepo=AppDataSource.getRepository(Supplier);
    async getAllProducts(){
        return await this.productrepo.find({
          relations:["orderItems","supplier"]


        })
    }
    async getProductById(id:any)
    {
        return await this.productrepo.findOne({
            where:{product_id:id},
            relations:["orderItems","supplier"]
        })

    }
    async createProduct(supplier_id:number,productName: string, unitPrice: number, packagename: string, isDiscontinued: boolean,orderItems:{quantity:number,unitPrice:number}[]) {
      const supplier=await this.supplierrepo.findOne({where:{supplier_id:supplier_id}})
      const newProduct = new Product();
        newProduct.productName = productName;
        newProduct.unitPrice = unitPrice;
        newProduct.packagename = packagename;
        newProduct.isDiscontinued = isDiscontinued;
        if(orderItems){
          newProduct.orderItems = orderItems.map((orderData: any) => {
              const order = new OrderItem();
              order.quantity = orderData.quantity;
              order.unitPrice = orderData.unitPrice;
              return order;
            });
          }
          newProduct.supplier = supplier
        const createdProduct= await this.productrepo.save(newProduct);
        console.log(createdProduct)
        return createdProduct
        return await this.productrepo.save(newProduct);
      
    }
      async updateProduct(productId: number, updateProduct: any) {
        const existingProduct = await this.productrepo.findOne({
          where: { product_id: productId },
        });
    
        if (!existingProduct) {
          throw new Error("Product not found");
        }
    
        await this.productrepo.update(productId, updateProduct);
      }
      async deleteProduct(productId: number) {
        const product = await this.productrepo.findOne({
          where: { product_id: productId },
        });
    
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
    
        await this.productrepo.remove(product);
      }

}

export default new productService;