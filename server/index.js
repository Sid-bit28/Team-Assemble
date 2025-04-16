const express = require('express');
const { clerkMiddleware } = require('@clerk/express');
const cors = require('cors');

const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const webHookRouter = require('./routes/webhook.route');
const { connectDB } = require('./lib/connectDB');

const PORT = process.env.PORT;

const app = express();
app.use(cors(process.env.CLIENT_URI));
app.use(clerkMiddleware());
// conflicts between express.json() and body-parser which is why I am keeping it above.
app.use('/webhooks', webHookRouter);
app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// Error handling using express @5
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || 'Something went wrong.',
    status: error.status,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}.`);
});
