import multer from "multer"

export const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
            cb(null,Date.now()+'-'+file.originalname)
    },
})

export const fileFilter=(req,file,cb)=>{
    
    if(file.mimetype.startsWith("image/"))
    {
        cb(null,true);
    }
    else{
        cb(new Error("only images are allowed "),false);

    }
}
