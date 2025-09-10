import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv'
import connectDB from './config/db'
import messageRoutes from './routes/messageRoutes'
import authRoutes from './routes/authRoutes'
import { handleSocketConnection } from './controllers/socketController';
import Server from 'socket.io'
import {notFound, errorHandler} from './middleware/error'


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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} with Socket.IO`));