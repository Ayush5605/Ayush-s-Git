import mongoose from "mongoose";
import Repository from "../Models/repoModel.js";
import Issue from "../Models/issueModel.js";
import user from "../Models/userModel.js";
import { MongoGridFSChunkError } from "mongodb";


export async function createRepository(req,res){

    const{owner,name,issue,content,description,visibility}=
    req.body;

    try{

        if(!name){
            res.status(400).json({error:"Repository name is required!"})
        }

        if(!mongoose.Types.ObjectId.isValid(owner)){
            res.status(400).json({error:"Invalid user name"})
        }

        const newRepository=new Repository({
            name,
            description,
            content,
            owner,
            visibility,
            issue


        });

        const result=await newRepository.save();

        res.status(201).json({
            message:"Repository created !!",
            repositoryID:result._id,
        });

    }catch(err){
        console.error("Error during repository creation :",err.message);
        res.status(500).send("Server error");

    }
};

export async function getAllRepositories(req,res){


    try{

        const repositories=await Repository.find({}).populate("owner").populate("issue");

        return res.json(repositories);

    }catch(err){
        console.error("Error during fetching repositories:", err.message);
        res.status(500).send("Server error");
    }
};

export async function fetchRepositoryById(req,res){

    const {id}=req.params;

    try{

        const repository=await Repository.find({_id:id})
        .populate("owner")
        .populate("issue");

        if(!repository){
            return res.json({message:"repo not found"});
        }
        return res.json(repository);

    }catch(err){
        console.log('server error!');
        return res.status(500).json({success:false,message:err.message});
    }
};

export async function fetchRepositoryByName(req,res){

    const {name}=req.params;

    try{

        const repository=await Repository.find({name:name});
        return res.json(repository);

    }catch(err){
        console.log("Server error!");
        return res.status(500).json({success:false,message:err.message});
    }
};

export async function fetchRepositoriesForCurrentUser(req,res){

    const {userId}=req.params;

    try{

        const repositories=await Repository.find({owner:userId});

        if(!repositories){
            return res.status(404).json({message:"No repository found for this user!"});
        }

        return res.json({success:true,repositories});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({success:false,message:err.message});
    }
};

export async function updateRepositoryById(){
    const {id}=req.params;

    const{content,description}=req.body;

    try{

        const repository=await Repository.find({_id:id});

        repository.content.push(content);
        repository.description=description;

        const updatedRepository=await repository.save();

        return res.json({success:true,
            message:"repository updated successfully",
            repository:updatedRepository});


    }catch(err){
        console.log(err.message);
        return res.status(500).json({success:false,message:err.message});

    }
};

export async function  togglevisibilityById(req,res){

    const {id}=req.params;

    try{

        const repository=await Repository.find({_id:id});

        repository.visibility=!repository.visibility;

        return res.json({success:true,
            message:"repository  visibility toggled successfully",
            repository});



    }catch(err){
        console.log(err.message);
        return res.status(500).json({success:false,message:err.message});

    }
};

export async function  deleteRepositoryById(){
    res.send("deleting repo");
};