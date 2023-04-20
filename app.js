import express from 'express';
import mongoose from "mongoose";
import router from './routes/userRouter'
import blogRouter from "./routes/blogRouter";

const app = express();
app.use(express.json())
app.use('/api/users', router)
app.use('/api/blogs', blogRouter)
/**
 * Environmental variables
 * username - mongodb atlas username
 * password - password to the mongo atlas database
 */
const username = process.env.USERNAME
const password = process.env.PASSWORD
mongoose
    .connect(`mongodb+srv://${username}:${password}@portfolio-x.lpwhmwr.mongodb.net/blog?retryWrites=true&w=majority`)
    .then(() => app.listen(5000))
    .then(() =>  console.log('Connected to mongoDB and listening port 5000'))
    .catch((err) => console.error(`Error: ${err}`))

