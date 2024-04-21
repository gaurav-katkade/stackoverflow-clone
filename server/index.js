import express from 'express'
import mongoose from 'mongoose'
import cors  from 'cors'
import userRouter from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import dotenv from 'dotenv'


const app = express()
dotenv.config();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/user',userRouter)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.get('/',(req,res)=>{
    res.send("This is rest api")
})

const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server is running at port ${PORT}`)}))
.catch((err)=>{err.message})
