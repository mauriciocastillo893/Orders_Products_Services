import express from 'express'
import 'dotenv/config'
import proxy from 'express-http-proxy'

const app = express()
app.use(express.json())

app.use('/api/v1/orders',proxy('http://localhost:3001'));
app.use('/api/v1/products',proxy('http://localhost:3002'));

app.listen(process.env.MAIN_PORT || 3000, () => {
    console.log("Server Gateway is running on port", process.env.MAIN_PORT || 3000)
}) 