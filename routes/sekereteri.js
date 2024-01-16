import { Router } from 'express';
const sekereteriRouter = Router();
import Abaririmbyi from "../models/abaririmbyi.js";

sekereteriRouter.post('/register',async(req,res) =>{
    const NewLeader = new Abaririmbyi({
      names: req.body.names,
      phone: req.body.phone,
    })
    try {
      const president = await NewLeader;
      const saved = await president.save()
        res.status(200).json(saved)
        //res.redirect("/teacher/add");
      } catch {
        res.send("error")
    }
})

export default sekereteriRouter