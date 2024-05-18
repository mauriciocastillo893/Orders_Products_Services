import express from 'express'
import 'dotenv/config'
import { orderRouter } from './Orders/Infrastructure/Routes/OrderRouter'

const app = express()
app.use(express.json())

app.listen(process.env.ORDERS_PORT || 3001, () => {
    console.log("Server is running on port", process.env.ORDERS_PORT || 3001)
}) 

function main(){
    app.use('/', orderRouter)
}

main()