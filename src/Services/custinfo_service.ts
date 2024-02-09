import AppDataSource from "../Datasource/datasource";
import { Custinfo } from "../Entities/Custinfo.entity";
import { Customer } from "../Entities/Customer.entity";


class custinfoService{
    private custinforepo=AppDataSource.getRepository(Custinfo);
    private customerrepo=AppDataSource.getRepository(Customer);
    async getAllCustinfo(){
        return await this.custinforepo.find({
            relations:["customer"]
        })
    }

    async getCustinfoById(id:any)
    {
        return await this.custinforepo.findOne({
            where:{id},
            relations:["customer"],
        })
    }
    async createCustinfo(additionalinfo:string,customerid:number)
    {
        const existingCustomer = await this.customerrepo.findOne({
            where:{customer_id:customerid}});
      
          if (!existingCustomer) {
            throw new Error("Customer not found");
          }
        const newCustinfo=new Custinfo();
        newCustinfo.additionalinfo=additionalinfo;
        newCustinfo.customer=existingCustomer;
        return await this.custinforepo.save(newCustinfo);
    }
    async updateCustinfo(custinfoid:number,additionalinfo:string)
    {
        const existingCustinfo=await this.custinforepo.findOne(
            {where:{id:custinfoid}});
            if (!existingCustinfo) {
                throw new Error("Custinfo not found");
              }
            
              existingCustinfo.additionalinfo = additionalinfo;
            
              return await this.custinforepo.save(existingCustinfo)
    }
    async deleteCustinfo(custinfoId: number) {
        const existingCustinfo = await this.custinforepo.findOne(
            {where:{id:custinfoId}});
      
        if (!existingCustinfo) {
          throw new Error("Custinfo not found");
        }
      
        return await this.custinforepo.remove(existingCustinfo);
      }
}


export default new custinfoService;