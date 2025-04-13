const express = require('express')
const cors = require('cors')
const app = express();

const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter');
const connectDB = require('./config/db');

connectDB();

// ✅ Correct CORS setup
app.use(cors({
  origin: 'https://dev-connect-client-delta.vercel.app',
  credentials: true
}));

// ✅ Optional: preflight support
app.options('*', cors({
  origin: 'https://dev-connect-client-delta.vercel.app',
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/user/', userRouter);
app.use('/api/v1/post/', postRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
