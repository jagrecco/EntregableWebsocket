const listaProductos = []
let id=0

const listar = () => {
    if (!listaProductos.length)
    {
        const error={error:`error al buscar productos`}
        return error
    }
    return listaProductos
  };
  
  const listarUno = (id) => {

    const resultado=listaProductos.find((prod) => prod.id === id)

    if (resultado) {return resultado}

    return {error: "Producto inexistente"}

  };
  
  const agregar = (titulo, precio, url) => {
    const prodNuevo={"id":++id,"title":titulo, "price":precio, "thumbnail":url}
    listaProductos.push(prodNuevo);
    return prodNuevo
  };
  
  const eliminarProducto = (cualEs) => {

    let posicion=0

    listaProductos.find((prod, index) =>{
        if(prod.id == cualEs){posicion=index}
    })

    if (posicion) {
        listaProductos.splice(posicion,1)
    }

    return {error:"Producto no encontrado"}
  
  }
  
  const modificarProducto = (cualEs, Cambios) => {

    let posicion=0

    listaProductos.find((prod,index) =>{
        if(prod.id == cualEs){posicion=index}
    })

    if (posicion) {
        listaProductos[posicion]=Cambios
        return listaProductos[posicion]
    }

    return {error:"Producto no encontrado"}

  };
  
  module.exports = { agregar, listar, listarUno, eliminarProducto, modificarProducto };