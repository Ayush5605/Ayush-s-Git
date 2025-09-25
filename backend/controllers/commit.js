import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";


export async function commit(message){


    const repoPath=path.resolve(process.cwd(),".Ayush_Git");
    const stagingPath=path.join(repoPath,"staging");
    const commitPath=path.join(repoPath,"commits");


    try{

        const commitID=uuidv4();
        const commitDir=path.join(commitPath,commitID);
        await fs.mkdir(commitDir,{recursive:true});

        const files=await fs.readdir(stagingPath);

        for( let file of files){

            await fs.copyFile(
                path.join(stagingPath,file),
                path.join(commitDir,file)
            );
        }

        await fs.writeFile(

            path.join(commitDir,"commit.json"),
             JSON.stringify({message,Date:new Date().toISOString()})
        );

        console.log(`Commit created with ${commitID} and message ${message}`);

    }catch(err){
        console.log(err.message);
    }


}