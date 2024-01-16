import { Router } from 'express';
const adminRoutes = Router();
import Nyobozi from "../models/nyobozi.js";
import Abaterankunga from '../models/abaterankunga.js';


adminRoutes.post('/gushyiraho', async (req, res) => {
  try {
    if (req.body.titel) {
      const newLeader = new Nyobozi({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        titel: req.body.titel
      });

      const savedLeader = await newLeader.save();
      res.status(200).json(savedLeader);
    } else {
      const abaterankunga = new Abaterankunga({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
      });

      const savedAbaterankunga = await abaterankunga.save();
      res.status(200).json(savedAbaterankunga);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while saving data" });
  }
});

adminRoutes.get('/',async (req,res) =>{
 const kureba = await Nyobozi.find()
 if (kureba) {
  res.status(200).json(kureba)
 }
 else{
  res.status(500).json({message:"Nta muyobozi uri muri database"})
 }
})

adminRoutes.delete('/gusiba/:id',async (req,res) =>{
  
 const gusiba = await Nyobozi.findByIdAndRemove(req.params.id)
 if (gusiba) {
  res.status(200).json({message:"Umuyobozi yasibwe neza"})
 }
 else{
  res.status(500).json({message:"Uyu muyobozi ntawuri muri database"})
 }
  
 })

 //Abaterankunga
 adminRoutes.get('/abaterankunga',async (req,res) =>{
  const kureba = await Abaterankunga.find()
  if (kureba) {
   res.status(200).json(kureba)
  }
  else{
   res.status(500).json({message:"Nta muyobozi uri muri database"})
  }
 })
 
 adminRoutes.delete('/gusiba/umuterankunga/:id',async (req,res) =>{
   
  const gusiba = await Abaterankunga.findByIdAndRemove(req.params.id)
  if (gusiba) {
   res.status(200).json({message:"Umuyobozi yasibwe neza"})
  }
  else{
   res.status(500).json({message:"Uyu muyobozi ntawuri muri database"})
  }
   
  })

export default adminRoutes