const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const mensajes = [];
const productos = [];

app.set('views', './public');
app.set('view engine', 'ejs');

app.set('json spaces', 2)

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  // Esta ruta carga nuestro archivo index.html en la raíz de la misma
  /* res.sendFile("index.html", { root: __dirname }); */
  res.render('index', {productos});
});

app.get('/productos', (req, res) => {
  /* productos.push(req.body) */
  res.json(productos)

})

app.post('/productos', (req, res) => {
  productos.push(req.body)
  /* res.render('index', {productos}); */
  /* socket.emit("productos", {productos}); */

})


httpServer.listen(3000, () => console.log("SERVER ON: Puerto 3000")); 

// Servidor
io.on("connection", (socket) => {

  console.log("¡Nuevo cliente conectado!");

  socket.emit("mensajes", mensajes);

  socket.emit("productos", productos);

  socket.on("mensaje", (data) => {
    mensajes.push({ socketid: socket.id, mensaje: data });
    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("producto", (data) => {
    productos[0]={title: "prod1"}
    io.sockets.emit("productos", productos);
    console.log(data);
  });

});

