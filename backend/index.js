import yargs from "yargs";

import {hideBin} from "yargs/helpers";
import  {initRepo} from "./controllers/init.js";
import {add} from "./controllers/add.js";
import {commit} from "./controllers/commit.js";
import {push} from"./controllers/push.js";
import {pull} from "./controllers/pull.js";
import {revert} from "./controllers/revert.js";


yargs(hideBin(process.argv))
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
.command("commit","New changes added !",{},commit)
.command("push","Push initialised",{},push)
.command("pull","Pull intialised",{},pull)
.command("revert <commitID>","Revert changes",
    (yargs)=>{
        yargs.positional("<commitID>",{
            describe:"<commitID> revert back to "
        })
    },revert).demandCommand(1,"Enter a command").help().argv