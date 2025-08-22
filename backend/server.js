const express= require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors= require("cors")
const morgan= require("morgan")
const dotenv= require("dotenv")
const connectDB = require("./config/db")
const authRoutes= require("./routes/authRoutes")
const messageRoutes = require("./routes/messageRoutes")
const {notFound, errorHandler}= require("./middleware/error")
const { handleSocketConnection } = require("./controllers/socketController")


dotenv.config({ path: './config.env' });
connectDB();

const app= express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

handleSocketConnection(io);

app.use(express.json());
app.use(cors());
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