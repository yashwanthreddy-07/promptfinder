import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async()=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log('MongoDb is already Connected')

    }
    else{
        try {
            await mongoose.connect(process.env.MONGODB_URI,
                {dbName:"share_prompt",
            
            })

            isConnected = true;
            console.log("MongoDb Connected")
        } catch (error) {
            console.log(error)
        }
    }
}