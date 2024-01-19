import { Router } from 'express';
const sekereteriRouter = Router();
import Abaririmbyi from "../models/abaririmbyi.js";
import Nyobozi from '../models/nyobozi.js'
import jwt from 'jsonwebtoken'
import {verifyTokenAndAdmin,verifyToken,verifyTokenAndAuthorization} from '../routes/verifyToken.js'

sekereteriRouter.post('/register',verifyTokenAndAuthorization, async(req,res) =>{
    const NewLeader = new Abaririmbyi({
      names: req.body.names,
      phone: req.body.phone,
    })
    try {
      const president = NewLeader;
      const saved = await president.save()
        res.status(200).json(saved)
        //res.redirect("/teacher/add");
      } catch {
        res.send("error")
    }
})
sekereteriRouter.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Nyobozi.findOne({ email });

    if (!user) {
      return res.status(400).send('Nta muyobozi wabonetse!');
    }

    if (user) {
      const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.PASS_SEC, {
        expiresIn: '1d',
      });

      const { password, ...others } = user._doc;
      res.status(200).send({ ...others, accessToken });
    } else {
      res.status(400).json({ message: 'Mwatanze amakuru atuzuye !!!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

sekereteriRouter.get("/viewall", verifyTokenAndAuthorization, async (req, res) => {
  const umusazu = await Abaririmbyi.find() 
  res.status(200).json(umusazu)
});
sekereteriRouter.get("/delete/:id", async (req, res) => {
  await Abaririmbyi.findByIdAndDelete(req.params.id)
  res.status(200).json({status: "success", message: "Umuririmye yasibwe neza murakoze" })
});
sekereteriRouter.get("/edit/:id", async (req, res) => {
  const user = await Abaririmbyi.findById(req.params.id)
  res.send( {user : user})
});
sekereteriRouter.post("/edit/:id", async (req, res) => {
  const umusaz = await Abaririmbyi.findByIdAndUpdate(req.params.id,req.body)
  res.status(200).json(umusaz)
  
});

export default sekereteriRouter