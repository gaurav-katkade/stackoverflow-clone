import express from 'express'
import mongoose from 'mongoose'
import cors  from 'cors'
import userRouter from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

const app = express()
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
const CONNECTION_URL = 'mongodb+srv://gauravkatkade:gauravkatkade54@cluster0.qby2l2k.mongodb.net/'
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server is running at port ${PORT}`)}))
.catch((err)=>{err.message})
