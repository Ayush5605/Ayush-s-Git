import mongoose from "mongoose";

const {Schema}=mongoose;


const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,

    },

    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String
    },

    repository:[{

        default:[],
        type:Schema.Types.ObjectId,
        ref:"Repository"
    },
],

    followedUsers:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],

    starRepo:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository"
        }
    ]

    
});

const user=mongoose.model("User",UserSchema);
export default user;

