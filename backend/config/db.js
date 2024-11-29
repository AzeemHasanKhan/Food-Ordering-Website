import mongoose from 'mongoose';

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://azeemhasankhan:zWhyVKhy5fd7f4Og@cluster0.3dqlzs2.mongodb.net/food-delivery").then(()=>{
        console.log("DB Connected")
    })
}