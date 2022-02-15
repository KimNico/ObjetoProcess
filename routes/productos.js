const express = require("express");
const fs = require("fs")
const path= require("path");
const Prod = require("../controller/ProdcutoController");

let prodController = new Prod("productos")

const router  = express.Router();

router.get('/', async(req,res,next)=>{
    res.render("index",{data: await prodController.getProductos()})
});

router.get("/productos", async(req,res,next)=>{
    let data = await prodController.getProductos();
    res.render("historial",{data})
});

router.post("/productos",async(req,res,next)=>{
    prodController.addProduct(req.body)
    res.redirect("/");
})

router.put("/productos/:id",async(req,res,next)=>{
    res.json(await prodController.getProductoById(req.body,req.params.id))
})

module.exports=router;