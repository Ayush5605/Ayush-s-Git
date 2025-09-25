import fs from "fs/promises";
import path from "path";


export async function add(filePath){

    const repoPath=path.resolve(process.cwd(),".Ayush_Git");
    const stagingPath=path.join(repoPath,"staging");


    try{

        await fs.mkdir(stagingPath,{recursive:true});
        const fileName=path.basename(filePath);
        await fs.copyFile(filePath,path.join(stagingPath,fileName));
        console.log(`File ${fileName} was added !!`);

    }catch(err){
        console.log(err.message);
    }
    
}