const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')

if (process.env.NODE_ENV !== 'production'){

    require('dotenv/config');
}


const app = express()


// MIDDLEWARES
app.use(express.json())
app.use(cors())
// app.use(bodyParser.json())
app.use('/api/user',authRoutes)
app.use('/api/product',productRoutes)
app.get('/test',(req,res)=>{
    const status = 200
    const message = 'links are working properly'
    res.status(status).json({status,message})
})


// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log('connected to DB...')
});

mongoose.set('useFindAndModify', false);

const db = mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('connected to mongoose'))


const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`Listening on port ${port}...`)})