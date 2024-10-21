import "reflect-metadata"
import "express-async-errors"
import express from "express"
import appRoutes from "./routes"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors())

appRoutes(app)

export default app
