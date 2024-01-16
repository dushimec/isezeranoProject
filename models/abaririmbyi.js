import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const AbaririmbyiSchema = new Schema({
 
  names:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  }
});
export default model("Abaririmbyi", AbaririmbyiSchema)