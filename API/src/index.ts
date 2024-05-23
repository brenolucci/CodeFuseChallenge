import { server } from "./server";
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './view/bookRoutes';
import dotenv from 'dotenv';
import sectionRoutes from "./view/sectionRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', [bookRoutes, sectionRoutes]);

server(app);

export default app;
