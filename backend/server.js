import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import messageRoutes from './routes/messageRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { handleSocketConnection } from './controllers/socketController.js';
import {Server} from 'socket.io'
import errorMiddleware from './middleware/error.js';

// handle uncaught error
process.on("uncaughtException", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1)
})

dotenv.config({ path: './config.env' });
connectDB();

const app= express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"], // dono allow
    methods: ["GET", "POST"],
    credentials: true
  }
});


handleSocketConnection(io);

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.json({status: "backend is running"});
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// middleware for errors
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;
const myServer = server.listen(PORT, () => console.log(`Server running on port ${PORT} with Socket.IO`));

// unhandled Promise rejection
process.on("unhandledRejection", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled Promise rejection');
  myServer.close(()=>{
    process.exit(1)
  })
})