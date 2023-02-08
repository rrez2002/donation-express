import express, { Request, Response } from 'express';
import  dotenv from 'dotenv';

dotenv.config();
const app = express();
const url = process.env.URL;
const port = process.env.PORT;

// define a route handler for the default home page
app.get( "/", (req: Request,res : Response ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log(`[server]: Server is running at ${url}:${port}`);
} );