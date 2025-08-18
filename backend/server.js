const express= require("express");
const cors= require("cors")
const morgan= require("morgan")
const dotenv= require("dotenv")
const connectDB = require("./config/db")
const authRoutes= require("./routes/authRoutes")
const {notFound, errorHandler}= require("./middleware/error")

dotenv.config();
connectDB();

const app= express();

app.use(express.json()); // read json bodies
app.use(cors()); // allow frontend to call backend
app.use(morgan("dev")); //log requests in console

// simple health route check server alive
app.get("/health", (req, res) => {
    res.json({status: "backend is running"});
});

// auth routes start with /api/auth

app.use("/api/auth", authRoutes);

// 404 + error handlers

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))