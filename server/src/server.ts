import dotenv from "dotenv"
import express, { Express } from "express"
import mongoose from "mongoose"
import routes from "./routes/routes"
import cors from "cors"
import errorHandler from './middlewares/errorhandle'

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT || 5000

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use(routes)

// Error Handler
app.use(errorHandler)

// DataBase
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log("DataBase is connected")
        app.emit("DataBase")
    })
    .catch((error) => {
        console.log(error)
    })

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in localhost:${port}`)
    })
})