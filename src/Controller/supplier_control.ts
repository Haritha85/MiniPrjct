import express, { response } from "express";
import AppDataSource from "../Datasource/datasource";
import supplierService from "../Services/supplier_service";
import { Supplier } from "../Entities/Supplier.entity";
const router5:express.Router=express.Router();

router5.get("/details",async function(req,res)
{
    let supplierrepo=AppDataSource.getRepository(Supplier);
    const suppliers=await supplierService.getAllSuppliers();
    res.json(suppliers);
});
router5.get("/getOne/:supplierid",async function(req,res)
{
    try {
        const supplier_id = parseInt(req.params.supplierid);
        const supplier = await supplierService.getSupplierById(supplier_id);
    
        if (!supplier) {
          res.status(404).send("Supplier not found");
        } else {
          res.json(supplier);
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
});
router5.post("/create",async function(req,res)
{
    try{
        const {customers,companyName,contactName,city,country,phone,products}=req.body;
    if(!companyName || !contactName || !city ||!country||!phone)
        {
            throw new Error("Incomplete data!")
        }
    const newSupplier=await supplierService.createSupplier(
        companyName,contactName,city,country,phone,products,customers
    );
    res.json(newSupplier);
    }
    catch(error)
    {
        if(error instanceof Error)
        {
            return res.status(500).json({ error: error.message });}

    }
});

router5.put("/update/:id",async function(req,res)
{
   const id=parseInt(req.params.id);
   const updatedata=req.body;
   if(!id||!updatedata)
   {
    return res.status(400).json({error:"invalid input"});
   }
   await supplierService.updateSupplier(id, updatedata);
  res.json({message:"Supplier data updated successfully"});
});
router5.delete("/delete/:id",async function(req,res)
{
    try
    {
        const supplierid=parseInt(req.params.id);
        await supplierService.deleteSupplier(supplierid);
        res.json({message:"Supplier deleted successfully"});
    }
    catch(error)
    {
      if(error instanceof Error)
      {
        return res.status(500).json({error:error.message});
      }
    }
});

export default router5;