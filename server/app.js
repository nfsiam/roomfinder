import express from 'express';
import bodyParser from 'body-parser';
import cors from './modules/corsSetup.js';

import mongoose from 'mongoose';
import routes from './routes/routes.js';
import dotenv from 'dotenv';

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

dotenv.config()
const app = express();

app.use(cors());
app.use(bodyParser.json())

routes(app);

app.listen(process.env.PORT);