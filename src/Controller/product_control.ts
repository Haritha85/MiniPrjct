import express, { response } from "express";
import { Product } from "../Entities/Product.entity";
import AppDataSource from "../Datasource/datasource";
import productService from "../Services/product_service";
import { json } from "stream/consumers";
const router3:express.Router=express.Router();
 
router3.get("/details",async function(req,res)
{
    let productrepo=AppDataSource.getRepository(Product);
    const products=await productService.getAllProducts();
    res.json(products);
});
router3.get("/details/:productid",async function(req,res)
{
    const product_id=parseInt(req.params.productid);
    const product=await productService.getProductById(product_id);
    if(!product)
    {
        res.status(404).send("product not found");
    }
    else{
        res.json(product);
    }
});
router3.post("/create", async function (req, res) {
    try {
      const { supplier_id,productName, unitPrice, packagename, isDiscontinued,orderItems } = req.body;
  
      if (!supplier_id||!productName || !unitPrice || !packagename || isDiscontinued === undefined) {
        return res.status(400).json({ error: "Invalid product data in the request body." });
      }
  
      const newProduct = await productService.createProduct(supplier_id,productName, unitPrice, packagename, isDiscontinued,orderItems);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router3.put("/update/:productid", async function (req, res) {
    try {
      const product_id = parseInt(req.params.productid);
      const updateProduct = req.body;
  
      if (!product_id || !updateProduct) {
        return res.status(400).json({ error: "Invalid input" });
      }
  
      await productService.updateProduct(product_id, updateProduct);
      res.json({ message: "Product data updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router3.delete("/delete/:productid", async function (req, res) {
    try {
      const product_id = parseInt(req.params.productid);
      await productService.deleteProduct(product_id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router3;