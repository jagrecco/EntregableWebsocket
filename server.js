const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const prodsFake = require("./productosFake.js")

const p = require("./public/prod2.json")

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const mensajes = [];
const productos = p;

app.set('views', './public');
app.set('view engine', 'ejs');

app.set('json spaces', 2)

app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

  res.render('index', {productos});
});

app.get('/productos', (req, res) => {

  res.json(productos)

})

app.get('/api/productos-test', (req, res)=>{
  
  res.render('tablaFake', {prodsFake})
  
})

app.post('/productos', (req, res) => {
  productos.push(req.body)

})

httpServer.listen(8080, () => console.log("SERVER ON: Puerto 8080")); 

// Servidor
io.on("connection", (socket) => {

  console.log("¡Nuevo cliente conectado!");

  socket.emit("mensajes", mensajes);

  socket.emit("productos", productos);

  socket.on("mensaje", (data) => {

    mensajes.push(data)
    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("producto", (prod) => {

    productos.push(prod)
    io.sockets.emit("productos", productos);

  });

});
