import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import * as cors from 'cors';


class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/CRMdb';

    //options for cors midddleware
    options:cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "http://localhost:3000/",
        preflightContinue: false
    };

    
    
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();        


        
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });    
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //support CORS
        this.app.use(cors(this.options));

    }

}

export default new App().app;