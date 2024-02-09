import express, {response} from "express";
import addfeatures from "../Services/additionalfeatures_service";
import AppDataSource from "../Datasource/datasource"
import { Customer } from "../Entities/Customer.entity";
const router6:express.Router=express.Router();

router6.get("/numberofOrders/:customerid",async function(req,res)
{
    try{
    const id=parseInt(req.params.customerid);
    const getOrders=await addfeatures.getNumberOfOrders(id);
    res.json(getOrders);
    }
    catch(error)
    {
        if(error instanceof Error)
        {
            return res.status(500).json({error:error.message});
        }
    
    }
   

})
router6.get("/activeOrders/:id",async function(req,res)
{
  const customerid=parseInt(req.params.id);
  try{
    const activeOrders=await addfeatures.getActiveOrdersForCustomer(customerid);
    res.json({activeOrders});
  }
  catch(error)
  {
    res.status(500).json({error:error.message});
  }
})
router6.post("/createorder/:id",async function(req,res)
{
  const customerid=parseInt(req.params.id);
  const Complted=req.body.Complted;
  const product=req.body.products;
  console.log(Complted);
  console.log(product);
  await addfeatures.creatingOrders(customerid,Complted,product);
})

export default router6;
