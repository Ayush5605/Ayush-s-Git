import fs from "fs/promises";
import path from "path";


export async function push(){

    const repoPath=path.resolve(process.cwd(),".Ayush_Git");
    const commitsPath=path.join(repoPath,"commits");


    try{
        const commitDirs=await fs.readFile(commitPath);

        for(const commitDir of commitDirs){

            const commitPath=path.join(commitsPath,commitDir);
            const files=await fs.readdir(commitPath);
            for(const file of files){
                const filePath=path.join(commitPath,file);
                const fileContent=await fs.readFile(filePath);
                

            }

        }

    }catch(err){
        console.log(err.message);
    }
}