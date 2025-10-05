import mongoose from "mongoose";
import { boolean } from "yargs";

const {Schema}=mongoose;

const RepositorySchema=new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    content:[{
        type:String
    },
],
visibility:{

    type:boolean

},

   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    require:true,

   },

   issue:[{
    type:Schema.Types.ObjectId,
    ref:"Issue"
   }]
});

const Repository=mongoose.model("Repository",RepositorySchema);

export default Repository;