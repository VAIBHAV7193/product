
import express, { Application } from 'express';
import bodyParser from 'body-parser';
const port = 5000;
import router from './route';
import connetDb from './config';
import requestLogger from './middleware';

const app: Application = express();
connetDb();
app.use(requestLogger)
app.use(bodyParser.json());
app.use('/api',router)
 app.listen(port,()=>{
    console.log("Server is running on port:::::::::",port)

})

export default app;

