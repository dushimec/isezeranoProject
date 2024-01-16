import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const AbaterankungaSchema = new Schema({
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

});
export default model("Abaterankunga", AbaterankungaSchema)