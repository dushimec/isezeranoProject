import { Router } from 'express';
const umusanzuRoute = Router();
import Umusanzu from "../models/Umusanzu.js";
import Nyobozi from '../models/nyobozi.js';
import {verifyTokenAndAdmin,verifyToken,verifyTokenAndAuthorization} from '../routes/verifyToken.js'

umusanzuRoute.post('/login', async (req, res) => {
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

umusanzuRoute.post("/add",verifyTokenAndAuthorization, async (req, res) => {
    const umusanzu = new Umusanzu({
        names : req.body.names,
        ukwezi_1 : req.body.ukwezi_1,
        ukwezi_2 : req.body.ukwezi_2,
        ukwezi_3 : req.body.ukwezi_3,
        ukwezi_4 : req.body.ukwezi_4,
        ukwezi_5 : req.body.ukwezi_5,
        ukwezi_6 : req.body.ukwezi_6,
        ukwezi_7 : req.body.ukwezi_7,
        ukwezi_8 : req.body.ukwezi_8,
        ukwezi_9 : req.body.ukwezi_9,
        ukwezi_10 : req.body.ukwezi_10,
        ukwezi_11 : req.body.ukwezi_11,
        ukwezi_12 : req.body.ukwezi_12,
    })
    try {
        const UmusanzuMushya = await umusanzu.save();
        res.status(200).json(UmusanzuMushya)
        //res.redirect("/teacher/add");
      } catch {
        res.send("error")
    }
});

umusanzuRoute.get("/viewall", verifyTokenAndAuthorization, async (req, res) => {
    const umusazu = await Umusanzu.find() 
    res.status(200).json(umusazu)
});
umusanzuRoute.get("/delete/:id", async (req, res) => {
    await Umusanzu.findByIdAndDelete(req.params.id)
    res.status(200).json({status: "success", message: "Umuririmye yasibwe neza murakoze" })
});
umusanzuRoute.get("/edit/:id", async (req, res) => {
    const user = await Umusanzu.findById(req.params.id)
    res.send( {user : user})
});
umusanzuRoute.post("/edit/:id", async (req, res) => {
    const umusaz = await Umusanzu.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json(umusaz)
    
});

export default umusanzuRoute;