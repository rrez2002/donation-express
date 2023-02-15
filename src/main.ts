import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {connect} from 'mongoose';
import Path from 'path';
import Router from "./router/router";
import {User} from "./app/models/user.model";

import {serve, setup} from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"


dotenv.config();
const project_name: string = process.env.NAME || "express_project";
const url: string = process.env.URL || "http://localhost";
const port: string = process.env.PORT || "8000";
const db_url: string = process.env.DB_URL || `mongodb://localhost:27017/${project_name}`;

class Application {
    private _app = express();

    constructor(PORT: string, DB_URL: string) {
        this.configApplication();
        this.configDatabase(DB_URL);
        this.createRouters();
        this.createServer(PORT);
    }

    private configApplication(): void {
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: true}));
        this._app.use(express.static(Path.join(__dirname, "..", "public")));
        this._app.use("/api-doc", serve, setup(swaggerJSDoc({
            swaggerDefinition:{
                info: {
                    title: "donation-express",
                    version: "1.0.0",
                    description: "express project for donate to users"
                },
            },
            apis : ["./router/*/*.ts"],
        })));
    }

    private createServer(port: string): void {
        this._app.listen(port, () => {
            console.log(`[server]: Server is running at ${url}:${port}`);
        })
    }

    private configDatabase(DB_URL: string): void {
        connect(DB_URL, (error) => {
            if (error) throw error;
            console.log("connect db success..")
        })
    }

    private createRouters(): void {
        this._app.get("/", (req: Request, res: Response) => {
            return res.json({
                message: "hello world"
            })
        })
        this._app.use(Router)
    }
}

function Main() {
    new Application(port, db_url)
}

Main()

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}