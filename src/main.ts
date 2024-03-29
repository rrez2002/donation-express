import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Path from 'path';
import Router from "./router/router";
import {User} from "./app/models/user.model";

import {serve, setup} from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

import {RedisClient} from "./utils/redis";

import morgan from "morgan"

dotenv.config();
const project_name: string = process.env.NAME || "express_project";
const url: string = process.env.URL || "http://localhost";
const port: string = process.env.PORT || "8000";
const db_url: string = process.env.DB_URL || `mongodb://localhost:27017/${project_name}`;

class Application {
    private _app = express();

    constructor(URL: string, PORT: string, DB_URL: string) {
        this.configApplication();
        this.configDatabase(DB_URL);
        this.configRedis();
        this.createRouters();
        this.createServer(URL,PORT);
    }

    private configApplication(): void {
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: true}));
        this._app.use(express.static(Path.join(__dirname, "..", "public")));

        this._app.use(morgan('dev'))


        if (process.env.NODE_ENV === 'development'){
            this._app.use("/api-doc", serve, setup(swaggerJSDoc({
                swaggerDefinition: {
                    openapi: "3.0.0",
                    info: {
                        title: "donation-express",
                        version: "1.0.0",
                        description: "express project for donate to users"
                    },
                    schemes: ["http", "https"],
                    servers: [{url: `${url}:${port}`}],
                    components:{
                        securitySchemes : {
                            BearerAuth : {
                                type: "http",
                                scheme: "bearer",
                                bearerFormat: "JWT",

                            }
                        }
                    },
                    security : [{BearerAuth : [] }]
                },
                apis: [`${__dirname}/router/swagger/*.ts`,],
            }), {
                explorer: true
            }));
        }
    }

    private createServer(url: string,port: string): void {
        this._app.listen(port, () => {
            console.log(`[server]: Server is running at ${url}:${port}`);
        })
    }

    private configDatabase(DB_URL: string): void {
        mongoose.set("strictQuery", true)
        mongoose.connect(DB_URL, (err) => {
            console.log(err ? err.message : "server connected to mongodb");
        });
    }

    private async configRedis(){
        await RedisClient.connect()
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
    new Application(url,port, db_url)
}

Main()

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}