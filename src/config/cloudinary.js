import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises"
// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_ENV, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
    });

const uploadImage = async (filePath)=>{
    try {

        if(!filePath)
        {   

            return null;
        }

        console.log("found image path ",filePath)
        const result = await cloudinary.uploader.upload(filePath,{
            folder:"profilePic",
            resource_type:"image",
        })
           
        //after uploading the file delete the image in local disk 

        await fs.unlink(filePath);
        console.log("file deleted from local disk ")
        return result.url
    } catch (error) {
        console.log(error)
        await fs.unlink(filePath);
        throw new Error("image couldnt uploaded on cloud ");
    }
}


export default uploadImage;