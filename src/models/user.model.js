import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
        ,
        profileImage:{
            type:String,
            required:false
        },
},{
    timestamps:true
})

const User = mongoose.model("user",userSchema)

export default User