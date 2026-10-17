import express from 'express';
import dotenv from 'dotenv';
import routerAPI from './routes/index.js';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('public'));

routerAPI(app);

app.listen(process.env.PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${process.env.PORT}`);
});