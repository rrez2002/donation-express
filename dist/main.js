"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const url = process.env.URL || "http://localhost";
const port = process.env.PORT || "8000";
const db_url = process.env.DB_URL || "";
const app = (0, express_1.default)();
class Application {
    constructor(PORT, DB_URL) {
        this._app = (0, express_1.default)();
        this.configApplication();
        this.configDatabase(DB_URL);
        console.log("tes");
        this.createRouters();
        this.errorHandler();
        this.createServer(PORT);
    }
    configApplication() {
        // this._app.use(express.json);
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
    }
    createServer(port) {
        this._app.listen(port, () => {
            console.log(`[server]: Server is running at ${url}:${port}`);
        });
    }
    configDatabase(DB_URL) {
        (0, mongoose_1.connect)(DB_URL, (error) => {
            if (error)
                throw error;
            console.log("connect db success..");
        });
    }
    errorHandler() {
        // this._app.use((req: Request, res: Response, next: NextFunction) => {
        //     return res.status(500).json({
        //         status: 500,
        //         message: "error"
        //     })
        // })
        // this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        //     const status = err.status
        //     return res.status(500).json({
        //         status: 500,
        //         message: "error"
        //     })
        // })
    }
    createRouters() {
        console.log("reqq");
        this._app.get("/", (req, res) => {
            console.log("req");
            return res.json({
                message: "hellooooooo"
            });
        });
    }
}
new Application(port, db_url);
// define a route handler for the default home page
// app.get( "/", (req: Request,res : Response ) => {
//     res.send( "Hello world!" );
// } );
//
// // start the Express server
// app.listen( 8001, () => {
//     console.log(`[server]: Server is running at ${url}:${port}`);
// } );
//# sourceMappingURL=main.js.map