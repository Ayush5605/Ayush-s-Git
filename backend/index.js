import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import {Server} from "socket.io";



import yargs from "yargs";

import {hideBin} from "yargs/helpers";
import  {initRepo} from "./controllers/init.js";
import {add} from "./controllers/add.js";
import {commit} from "./controllers/commit.js";
import {push} from"./controllers/push.js";
import {pull} from "./controllers/pull.js";
import {revert} from "./controllers/revert.js";


dotenv.config();


yargs(hideBin(process.argv))
.command("start","Start a new Server",{},startServer)
.command("init","Initialise a new repository",{},initRepo)
.command("add <File>","New changes added !",
    (yargs)=>{
        yargs.positional("File",{
            describe:"File to add to staging",
            type:"String",

        })
    }
,(argv)=>{
    add(argv.File);

})
.command("commit <message>","New changes added !",{},
    (argv)=>{
        commit(argv.message);

    }
    )
.command("push","Push initialised",{},push)
.command("pull","Pull intialised",{},pull)
.command("revert <commitID>","Revert changes",
    (yargs)=>{
        yargs.positional("<commitID>",{
            describe:"<commitID> revert back to "
        })
    },revert).demandCommand(1,"Enter a command").help().argv;


    function startServer(){

        const app=express();
        const port=process.env.PORT || 3000;

        app.use(bodyParser.json());
        app.use(express.json());

        const mongoURI=process.env.MONGODB_URI;

        mongoose.connect(mongoURI)
        .then(()=>{
            console.log("Connected to Database");
        }).catch((err)=>{
            console.log(err.message);
        });

        app.use(cors({origin:"*"}));

        app.get("/",(req,res)=>{
            res.send("welcome");
        })

        const httpServer=http.createServer(app);
        const io=new Server(http,{

            cors:{
                origin:"*",
                methods:["GET","POST"]
            }

        });

        let user="test";

        io.on("connection",(socket)=>{
            socket.on("joinRoom",(userID)=>{
               user=userID;
               console.log("======");
               console.log(user);
               console.log("======") 
            });
            
        })

        const db=mongoose.connection;

        db.once("open",async()=>{
            console.log("CRUD operations called !!");
        });


        httpServer.listen(port,()=>{
            console.log(`Server is running on ${port}`);
        })

    }