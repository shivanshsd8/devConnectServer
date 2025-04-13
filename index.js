const express = require('express')
const cors = require('cors')
const app = express();

const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter');
const connectDB = require('./config/db');

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/v1/user/',userRouter)
app.use('/api/v1/post/',postRouter)


app.listen(3000,()=>{
    console.log('Listening on port 3000');
})