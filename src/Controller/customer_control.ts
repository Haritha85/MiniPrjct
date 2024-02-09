import express, {response} from "express";
import AppDataSource from "../Datasource/datasource"
import customer_Service from "../Services/customer_service";
import orderService from "../Services/order_service";
import { Customer } from "../Entities/Customer.entity";
const router:express.Router=express.Router();

router.get("/details",async function(req,res)
{
    let customerrepo=AppDataSource.getRepository(Customer);
    const customers=await customer_Service.getAllCustomers();
    res.json(customers);
})

router.get("/getOne/:customer_id",async function(req,res)
{
    try {
        const customer_id = parseInt(req.params.customer_id);
        const customer = await customer_Service.getCustomerById(customer_id);
    
        if (!customer) {
          res.status(404).send("Customer not found");
        } else {
          res.json(customer);
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
});

router.post("/create",async function(req,res)
{
    try{
        const {firstName,lastName,city,country,phone,order,suppliers}=req.body;
    if(!firstName || !lastName || !city ||!country||!phone)
        {
            throw new Error("Incomplete data!")
        }
    const newCustomer=await customer_Service.createCustomer(
        firstName,lastName,city,country,phone,order,suppliers
    );
    res.json(newCustomer);
    }
    catch(error)
    {
        if(error instanceof Error)
        {
            return res.status(500).json({ error: error.message });}

    }
});
router.put("/update/:id",async function(req,res)
{
   const id=parseInt(req.params.id);
   const updatedata=req.body;
   if(!id||!updatedata)
   {
    return res.status(400).json({error:"invalid input"});
   }
   await customer_Service.updateCustomer(id, updatedata);
  res.json({message:"customer data updated successfully"});
})

router.delete("/delete/:id",async function(req,res)
{
    try
    {
        const customerid=parseInt(req.params.id);
        await customer_Service.deleteCustomer(customerid);
        res.json({message:"customer deleted successfully"});

    }
    catch(error)
    {
      if(error instanceof Error)
      {
        return res.status(500).json({error:error.message});
      }
    }
   });






export default router;