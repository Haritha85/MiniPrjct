import express, {response} from "express";
import AppDataSource from "../Datasource/datasource"
import { Order } from "../Entities/Order.entity";
import orderService from "../Services/order_service";
import router from "./customer_control";

const router2:express.Router=express.Router();
router2.get("/details",async function(req,res)
{
    let orderrepo=AppDataSource.getRepository(Order);
    const order=await orderService.getAllOrders();
    res.json(order);
})
router2.get("/getOne/:id",async function(req,res)
{
    const id=parseInt(req.params.id);
    const order=await orderService.getOrderById(id);
    if(!order)
    {
        res.status(404).send("order not found");

    }
    else{
        res.json(order);
    }

})
router2.post("/createOrder/:id",async function(req,res)
{
    
        const id=parseInt(req.params.id);

        
        const {  Complted,orderItem } = req.body;
        try {
        
        await orderService.addOrderitemsByIdtoorder(id,Complted,orderItem);
        return res.status(201).json("order added successfully");
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
router2.put("/updateOrder/:id", async function (req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const  updateOrder  = req.body;
  
      if (!orderId||!updateOrder) {
        return res.status(400).json({ error: "Invalid order data in the request body." });
      }
      await orderService.updateOrder(orderId,updateOrder);
      return res.status(200).json({message:"Updated successfully"})
        } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router2.delete("/deleteOrder/:id",async function(req,res)
{
    try{
        const id=parseInt(req.params.id);
        await orderService.deleteorder(id);
        return res.json({message:"order deleted successfully"});
    }
    catch(error)
    {
        if(error instanceof Error)
        {
            return res.status(500).json({error:error.message});
        }
    }
})






export default router2;