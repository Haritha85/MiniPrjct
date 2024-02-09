import express, { response } from "express";
import { Custinfo } from "../Entities/Custinfo.entity";
import AppDataSource from "../Datasource/datasource";
import custinfoService from "../Services/custinfo_service";
import router from "./customer_control";
const router1:express.Router=express.Router();

router1.get("/details",async function(req,res)
{
    let custinforepo=AppDataSource.getRepository(Custinfo);
    const custinfo=await custinfoService.getAllCustinfo();
    res.json(custinfo);
})
router1.get("/getOne/:id",async function(req,res)
{
    const id=parseInt(req.params.id);
    const custinfo=await custinfoService.getCustinfoById(id);
    if(!custinfo)
    {
        res.status(404).send("customerinfo not found");

    }
    else{
        res.json(custinfo);
    }

})
router1.post("/create",async function(req,res)
{
    try{
        const {additionalinfo,customerid}=req.body;

        
        if (!additionalinfo || !customerid) {
            return res.status(400).json({ error: "Invalid customer data in the request body." });
        }

        const newCustinfo=await custinfoService.createCustinfo(
            additionalinfo,
            customerid
            
        );
        res.json(newCustinfo);

    }catch(error)
    {
        if(error instanceof Error)
        {
            return res.status(500).json({error:error.message});
        }
    }
});
router1.put("/update/:id",async function(req,res)
{
    try{
        const { custinfoid, additionalinfo } = req.body;

        if (!custinfoid || !additionalinfo) {
          return res
            .status(400)
            .json({ error: "Invalid custinfo data in the request body." });
        }
        await custinfoService.updateCustinfo(
            custinfoid,
            additionalinfo
        );
        res.json("updated successfully");
    }
    catch(error)
    {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
          }
    }
});
router1.delete("/delete/:id",async function(req,res)
{
    try{
        const id = parseInt(req.params.id);

    if (!id) {
      return res.status(400).json({ error: "Invalid custinfo ID " });
    }
    await custinfoService.deleteCustinfo(id);
    res.json({message:"deleted successfully"});
    }
    catch(error)
    {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
          }
    }
})
export default router1;