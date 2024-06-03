import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/react")
    .then((result)=>{
        console.log("connected to server")
    })
    .catch((err)=>{
        console.log(err)
    })

export default mongoose;