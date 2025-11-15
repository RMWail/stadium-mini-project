import exress from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
dotenv.config()
import clientsRouting from './routes/clientsRouting.js';
import adminRouting from './routes/adminRouting.js';
import managerRouting from './routes/managerRouting.js';
import stadiumRouting from './routes/stadiumRouting.js';
import loginRouting from './routes/loginRouting.js';
import morgan from 'morgan';
import { Server as socketio } from 'socket.io';

const port = process.env.PORT;
const API_CLIENT = process.env.API_CLIENT;
const app = exress();



const expressServer = app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})


 app.use(cors({
    origin: `${API_CLIENT}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

const io = new socketio(expressServer,{
  cors: {

    origin: `${API_CLIENT}`,
    methods: ["GET","POST"],
    credentials: true
  }
})

app.use((req,res,next)=>{
  req.io = io;
  next();
})

io.on('connect',(socket)=>{

 // console.log(socket.id + 'has joined our server');


 // Join room event
 socket.on('joinRoom', (data) => {
 // console.log('cutomerUsername in join Room = '+data.cutomerUsername);
  socket.join(data.cutomerUsername);
  console.log(`Customer ${data.cutomerUsername} joined room ${data.cutomerUsername}`);
 // console.log(io.sockets.adapter.rooms); // Log the rooms
});
})



app.use(morgan('short'));
app.use(bodyParser.json());
app.use('/',clientsRouting);
app.use('/',adminRouting);
app.use('/',managerRouting);
app.use('/',stadiumRouting);
app.use('/',loginRouting);

//export default app;
