import express from 'express'
import 'dotenv/config'
import { orderRouter } from './Orders_Infrastructure/Orders/Infrastructure/Routes/OrderRouter'


const app = express()
app.use(express.json())

app.listen(process.env.MAIN_PORT || 3000, () => {
    console.log("Server is running on port", process.env.MAIN_PORT || 3000)
}) 

function main(){
    app.use('/orders', orderRouter)
}

main()