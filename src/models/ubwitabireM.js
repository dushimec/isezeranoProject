import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UbwitabireSchema = new Schema({
 
  names:{
    type:String,
    required:true
  },
  present:{
    type:Boolean
  },
  date:{
    type:Date,
    default: Date.now
  }
});
export default model("Ubwitabire", UbwitabireSchema)