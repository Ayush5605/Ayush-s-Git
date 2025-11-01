import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ReturnDocument } from "mongodb";
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

        await connectClient();
        const db=client.db("test");
        const userCollection=db.collection("users");

        const user=await userCollection.find({}).toArray();
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
        const db=client.db("test");
        const userCollection=db.collection("users");

        const Existinguser=await userCollection.findOne({username});

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

            const result=await userCollection.insertOne(newUser);

            const token=jwt.sign({id:result.insertedId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
           return res.json({token,userId:result.insertedId});

        

    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"server error"});

    }
};

export async function login(req,res){

    const {email,password}=req.body;

    try{

        await connectClient();
        const db=client.db("test");
        const userCollection=db.collection("users");

        const user=await userCollection.findOne({email});

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
        const db=client.db("test");
        const userCollection=db.collection("users");

        const user=await userCollection.findOne({
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

export async function updateUserProfile(req,res){

    const currID=req.params.id;
    const {email,password}=req.body;


    try{


         await connectClient();
         const db=client.db("test");
         const userCollection=db.collection("users");

         let updateFields={email};

         if(password){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            updateFields.password=hashedPassword;
         }

         const result=await userCollection.findOneAndUpdate({
            _id:new ObjectId(currID)
         },
        {$set:updateFields},
    {returnDocument:"after"});



    if(!result.value){
        return res.json({success:false,message:"User not found !!"});
    }

        return res.json({success:true,message:"user profile updated successfully"});





    }catch(err){
        return res.json({success:false,message:"Cannot update user profile !"});
    }
};

export async function deleteUser(req,res){

    const currID=req.params.id;


    try{

         await connectClient();
         const db=client.db("test");
         const userCollection=db.collection("users");

         const result=await userCollection.deleteOne({
            _id: new ObjectId(currID)
         });


         if(result.deletedCount==0){
            return res.json({success:false,message:"User not found !"});
         }

         return res.json({success:true,message:"User profile deleted!!"});



    }catch(err){
        return res.json({success:false,message:err.message});
    }
}