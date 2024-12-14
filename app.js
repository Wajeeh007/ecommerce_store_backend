require('dotenv').config()
require('express-async-errors')
const express = require('express')
const sendEmail = require('./custom_functions/send_email')
const authRouter = require('./routes/auth')
const errorHandlerMiddleware = require('./middlewares/error_handler.js')
const mongoose = require('mongoose')
const checkKeys = require('./custom_functions/check_rsa_keys')

const port = process.env.PORT || 3000

const app = express()

//MIDDLEWARES
app.use(express.json())


//ROUTES
app.use('/auth', authRouter)


app.use(errorHandlerMiddleware)
const startServer = async () => {
    try {
        await checkKeys()
        await mongoose.connect(process.env.MONGO_URI)
        // const connection = mysql.createConnection({
        //     host: '192.168.18.45',
        //     user: 'ecommerce_db_server',
        //     password: 'Wajeeh@007',
        //     database: 'ecommerce_store'
        // })

        // connection.connect(function (err) {
        //     if(err) {
        //         return console.log(err)
        //     } 
        //     console.log(connection.threadId)
        // })
        
        app.listen(port, console.log(`App listening on port: ${port}`))
      
    } catch (e) {
        console.log(e)
        // await sendEmail({subject: 'Server Failure', to: 'wajeeh.gillani335@gmail.com', message: `Server has encountered error during deployment.\nThe error is: ${e}`})
        // process.exit(0)        
    }
}

startServer()