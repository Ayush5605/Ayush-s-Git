import fs from "fs/promises";
import path from "path";



export function pull(){

    const repoPath=path.resolve(process.cwd(),".Ayush_Git");
    const commitsPath=path.join(repoPath,"commits");

    try{

    }catch(err){
        console.log(err.message);
    }


}