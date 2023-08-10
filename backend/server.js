import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import "./config/config.js";
import "./models/index.js"
import { Post } from "./models/PostModel.js";

await mongoose.connect(process.env.MONGO_URI);
await mongoose.connection.syncIndexes();

const app = express();
const PORT = 3001;
const upload = multer({storage:multer.memoryStorage()});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
}); 


app.get("/status", (req,res) => {
    res.send("Server läuft")
});


// alle Posts
app.get("/api/post", async (req,res)=>{
    const data = await Post.find();
    res.send(data);
})


// einzelner Post
app.get("/api/post/:id", async (req,res) => {
    try {
        const dataId = await req.params.id;
        const singlePost = await Post.findById(dataId);
        res.json(singlePost)
    } catch (error) {
        console.log(error);
        res.send("Error - get Post by Id")
    }
});


// Post deleten
app.delete("/api/post/delete/:id", async (req,res) => {
    try {
        const dataId = await req.params.id;
        const singlePost = await Post.findByIdAndDelete(dataId);
        cloudinary.uploader.destroy(dataId.image?.imageId, (err) => console.log(err));
        res.json(singlePost)
    } catch (error) {
        console.log(error);
        res.send("Error - delete Post by Id")
    }
});


// Post posten
app.post("/api/post", upload.single("image"), async (req,res) => {
    console.log(req.file);
    try {
        cloudinary.uploader
            .upload_stream(
                {resource_type: "image", folder: "PostImage"},
                async (err, result) => {
                    console.log(result);
                    const response = await Post.create({
                        ...req.body,
                        image: {url: result.secure_url, imageId: result.public_id},
                    });
                    res.json(response);
                }
            ).end(req.file.buffer)
    } catch (err) {
        console.log(err);
        res.status(500).send("Error - Post posten");
    }
}); 

// einen Post bearbeiten und Bild updaten
app.put("/api/updatePost/:id",upload.single("image"), async (req,res) => {
    console.log(req.body);
     try { 
     const id = req.params.id;
 
         if (req.file){
             cloudinary.uploader.upload_stream(
                 {resource_type: "image", folder: "PostImage"},
                 async (err, result) => {
                     const response = await Post.findByIdAndUpdate(id, {
                         ...req.body,
                         image: {url: result.secure_url, imageId: result.public_id},
                     });
                     cloudinary.uploader.destroy(response.image?.imageId, (err) => {
                         console.log(err, "Error - img update");
                     });
                     
                     res.json(response);
                 }
             )
             .end(req.file.buffer)
         } else {
             const updatePost = await Post.findByIdAndUpdate(id, req.body, {returnDocument:"after"})
             console.log(req.body,updatePost);
             res.send(updatePost);
         } 
     }catch (error) {
             console.error(error);
             res.sendStatus(500).send("Error - update Post")
         }
 });
 

app.listen(PORT, () => console.log((`Der Server läuft auf Port: ${PORT}`)));