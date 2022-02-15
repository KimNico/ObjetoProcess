let express=require("express")
let path = require("path");
let {Server:IOServer}=require("socket.io")
let {Server: HttpServer} = require("http")
let cors = require("cors")
let app = express();
let ChatController = require("./controller/ChatController")
let ProductoController = require('./controller/ProdcutoController')
let prodRuta = require('./routes/productos')
let  httpServer= new HttpServer(app)
let io = new IOServer (httpServer)



const PORT = 8080;

const db_obj = require("./db/mariadb");
const db = db_obj.client;


//setting
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(prodRuta)

//Routes
let chatController = new ChatController("mensajes")
let prodController = new ProductoController("productos")



httpServer.listen(PORT,()=>{
     console.log(`http://localhost:${PORT}`)
})


//Socket
io.on('connection', async socket=>{
  socket.on('getProductos',async()=>{
    io.socket.emit('lista', await prodController.getProductos())
  })
  socket.on('productoNuevo', ()=>{
    io.socket.emit('lista' , prodController.getProductos())
  })

  let chat = await chatController.getMessages();
  socket.on('chatMensaje', async({email, date, msg})=>{
    await chatController.addChatMsg({email,date,msg});
    chat = await chatController.getMessages();
    io.socket.emit('chatMensaje',chat)
  })
})

