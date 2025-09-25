import fs from "fs/promises";
 import path from "path";
 
 
 export async function initRepo(){

    const repoPath=path.resolve(process.cwd(),".Ayush_Git");
    const commitPath=path.join(repoPath,"commits");


    try{

        await fs.mkdir(repoPath,{recursive:true});
        await fs.mkdir(commitPath,{recursive:true});
        await fs.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket:"s3 bucket "})
        )

        console.log("Repository initialised !");

    }catch(err){
        console.log(err.message);
    }
}



