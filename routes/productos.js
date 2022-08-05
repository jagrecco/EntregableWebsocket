const express = require("express");
const { Router } = require("express");
const productos = Router();

const clase = require("../clase")

productos.get("/", (req, res) => {

  const respuesta=clase.listar()
  
  res.json(respuesta)

});

productos.get("/:cual", (req, res) => {

  const respuesta=clase.listarUno(parseInt(req.params.cual))
  
  res.json(respuesta)
  
});

productos.post("/", (req, res) => {
  
  const agregarProducto=clase.agregar(req.body.title, req.body.price, req.body.thumbnail)
  
  res.json(agregarProducto)

});

productos.put("/:cual", (req, res) =>{
 
  const prodModificado=clase.modificarProducto(req.params.cual, req.body)

  res.json(prodModificado)

})

productos.delete("/:cual", (req, res) =>{

  const borrarProducto=clase.eliminarProducto(req.params.cual)

})

module.exports = productos;