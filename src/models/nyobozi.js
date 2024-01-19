import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const NyoboziSchema = new Schema({
  firstname:  {
    type : String,
    unique : true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  titel:{
    type:String,
    required:true
  }
});
export default model("Nyobozi", NyoboziSchema)