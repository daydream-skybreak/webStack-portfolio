import express from 'express';
import mongoose from "mongoose";
import router from './routes/userRouters'

const app = express();
app.use(express.json())
app.use('/api/users', router)

mongoose
    .connect('mongodb+srv://<username>:<password>@portfolio-x.lpwhmwr.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => app.listen(5000))
    .then(() => console.log('Connected to mongoDB and listening port 5000'))
    .catch((err) => console.error(`Error: ${err}`))

