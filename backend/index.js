import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";



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

    }