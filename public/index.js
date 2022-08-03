const socket = io();

const input = document.getElementById("inputChat");

document.getElementById("enviarChat").addEventListener("click", () => {

  socket.emit("mensaje", input.value);

  limpiaChat()
  
  console.log("emitido");

});


document.getElementById("productos").addEventListener("click", ()=>{
  socket.emit("producto", {title:"Producto1"})
})


socket.on("mensajes", (mensajes) => {
  const mensajesInput = mensajes
    .map(
      (mensaje) =>
        `SocketId: ${mensaje.socketid} -> Mensajes: ${mensaje.mensaje}`
    )
    .join("<br>");
  document.querySelector("p").innerHTML = mensajesInput;
});


socket.on("productos", (data) => {

  console.log(data)

  fetch('/productos')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => console.log(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
  /* const datosProductos=fetch("/productos")
    .this(function(response){
      console.log(response)
    })
    .catch(err=>{console.log(err)}) */
  /* const mensajesInput = mensajes
  .map(
    (mensaje) =>
    `SocketId: ${mensaje.socketid} -> Mensajes: ${mensaje.mensaje}`
    )
    .join("<br>");
    document.querySelector("p").innerHTML = mensajesInput; */
  });
  
  function limpiaChat() {  
    document.getElementById("inputChat").value=""
  }