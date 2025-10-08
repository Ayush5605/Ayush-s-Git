import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {ObjectId} from "mongodb";


dotenv.config();
const uri=process.env.MONGODB_URI;

let client;

async function connectClient(){
    if(!client){
        client=new MongoClient(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        await client.connect();
    }
}


export async function getAllUsers(req,res){

    try{

        connectClient();
        const db=client.db("Ayush_GIT");
        const userCollecton=db.collection("users");

        const user=await userCollecton.find({}).toArray();
        return res.json(user);

    }catch(err){
        return res.json({
            success:false,
            message:"Error in fetching user details!!"
        })
    }

};

 export async function signup(req,res) {
    
 

    const {username,password,email}=req.body;

    try{
        await connectClient();
        const db=client.db("Ayush_GIT");
        const userCollecton=db.collection("users");

        const Existinguser=await userCollecton.findOne({username});

        if(Existinguser){
            return res.status(400).json({message:"User already exists"});
        }

            const salt=await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(password,salt);

            const newUser={
                username,
                password:hashedPassword,
                email,
                repository:[],
                followedUsers:[],
                starRepo:[]

            }

            const result=await userCollecton.insertOne(newUser);

            const token=jwt.sign({id:result.insertedId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
           return res.json(token);

        

    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"server error"});

    }
};

export async function login(req,res){

    const {email,password}=req.body;

    try{

        await connectClient();
        const db=client.db("Ayush_GIT");
        const userCollecton=db.collection("users");

        const user=await userCollecton.findOne({email});

        if(!user){
            return res.json({success:false,message:"Invalid credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
             return res.json({success:false,message:"Invalid credentials"});
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({success:true,message:token});


    }catch(err){
        return res.json({success:false,message:err.message});

    }

}

export async function getUserProfile(req,res){

    const currID=req.params.id;

    try{

        await connectClient();
        const db=client.db("Ayush_GIT");
        const userCollecton=db.collection("users");

        const user=await userCollecton.findOne({
            _id:new ObjectId(currID)
        });


        if(!user){
            return res.status(400).json({message:"User not found !"});
        }

        return res.json(user,{message:"Profile fetched !"});


    }catch(err){

        return res.json({success:false,message:"Error during fetching user details"});

    }

};

export const updateUserProfile=(req,res)=>{
    console.log("update user");
};

export const deleteUser=(req,res)=>{
    console.log("Delete user");
}