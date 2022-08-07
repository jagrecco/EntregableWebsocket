const socket = io();

const input = document.getElementById("inputChat");

document.getElementById("enviarChat").addEventListener("click", () => {

  if (document.getElementById('inputMail').value!==""){
    
    const date = new Date();
    const output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + " " +date.toLocaleTimeString("es-ES");
    
    const mensaje = {
      mail: document.getElementById('inputMail').value,
      msg: document.getElementById('inputChat').value,
      date: output
    }
    
    socket.emit("mensaje", mensaje)
    
    limpiaChat()

  }

});

document.getElementById("productos").addEventListener("click", ()=>{
  
  let prod={nombre:document.getElementById("titulo").value,
  precio: document.getElementById("precio").value,
  foto: document.getElementById("img").value}
  
  socket.emit("producto", prod)
  
})

function AddProducto(datosProducto){

  socket.emit("producto", datosProducto)
  
}

socket.on("mensajes", (mensajes) => {

  const mensajesInput = mensajes
    .map(
      (mensaje) =>
      `<p class="mailMensaje boxMensajes">${mensaje.mail}</p> <p class="fechaMensaje boxMensajes">[${mensaje.date}]</p> <p class="txtMensaje boxMensajes"> ${mensaje.msg}</p>`
    
    )
    .join("<br>");
  document.getElementById("msg").innerHTML = mensajesInput;
});


socket.on("productos", (data) => {

  console.log(data)

  let tablaHtml=""

  for (let i=0; i<data.length; i++) {

    const rowImpar="table-primary"
    const rowPar="table-secondary"

    if (i%2) {
      tablaHtml +=`<tr class="${rowImpar}">`
      tablaHtml +=`<td>${data[i].nombre}</td>`
      tablaHtml +=`<td>$${data[i].precio}</td>`
      tablaHtml +=`<td class="imagen"><img src=${data[i].foto}></td></tr>`
      

    } else {
      
      tablaHtml+=`<tr class="${rowPar}">`
      tablaHtml+=`<td>${data[i].nombre}</td>`
      tablaHtml+=`<td>$${data[i].precio}</td>`
      tablaHtml+=`<td class="imagen"><img src=${data[i].foto}></td></tr>`
      
    }
  }

  document.getElementById("cuerpoTabla").innerHTML=tablaHtml

  });
  
  function limpiaChat() {  
    document.getElementById("inputChat").value=""
  }
