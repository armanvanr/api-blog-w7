const express = require("express");
const app = express();
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const port = 3030;

app.use(express.json());

app.use('/api', [userRouter, postRouter, commentRouter]);

app.listen(port, () => {
    console.log(`Server is open with ${port} port!`);
})