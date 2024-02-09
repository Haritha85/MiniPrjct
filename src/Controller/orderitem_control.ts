import AppDataSource from "../Datasource/datasource";
import express, {response} from "express";
import { OrderItem } from "../Entities/OrderItem.entity";
import orderitemService from "../Services/orderitem_service";
const router4:express.Router=express.Router();

router4.get("/details",async function(req,res)
{
    let orderitemrepo=AppDataSource.getRepository(OrderItem);
    const orderitems=await orderitemService.getAllOrderitems();
    res.json(orderitems);
})
router4.get("/getOne/:id",async function(req,res)
{
    try {
        const id = parseInt(req.params.id);
        const orderItem = await orderitemService.getOrderitemById(id);
        if (!orderItem) {
          res.status(404).send("OrderItem not found");
        } else {
          res.json(orderItem);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
router4.post("/createitem/:productid",async function(req,res)
{
    
        // const orderId = parseInt(req.params.orderid);
        const productId=parseInt(req.params.productid);
        const {quantity, unitPrice } = req.body;
        try {
        // if ( !quantity || !unitPrice ) {
        //   return res
        //     .status(400)
        //     .json({ error: "Invalid order item data in the request body." });
        // }
    
        await orderitemService.createOrderItem(quantity,productId);
        return res.status(201).json("Order item added successfully");
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

router4.put("/update/:id",async function(req,res)
{
    try {
        const orderItemId = parseInt(req.params.id);
        const updateOrderItem = req.body;
    
        if (!orderItemId || !updateOrderItem) {
          return res.status(400).json({ error: "Invalid order item data" });
        }
    
        await orderitemService.updateOrderItem(orderItemId, updateOrderItem);
        return res.status(200).json({ message: "Order item updated successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});
router4.delete("/delete/:id",async function(req,res)
{
    try {
        const orderItemId = parseInt(req.params.id);
        await orderitemService.deleteOrderItem(orderItemId);
        return res.json({ message: "Order item deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
export default router4;