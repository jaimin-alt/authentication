import mongoose, { mongo } from "mongoose"
const mongodb_uri = process.env.MONGODB_URI
console.log(mongodb_uri)
const connect_db = async () => {
    try {
        await mongoose.connect(mongodb_uri)
        console.log("database connected successfully ")
    } catch (error) {
        console.log("couldnt connect to database ")
        throw new error("databse connection failed")
    }
}

export default connect_db;