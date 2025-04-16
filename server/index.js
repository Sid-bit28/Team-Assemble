const express = require('express');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const { connectDB } = require('./lib/connectDB');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// app.get('/test', (req, res) => {
//   res.status(200).send('It works.');
// });

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}.`);
});
