import { Router } from "express";
const umuriRouter = Router();
import Abaririmbyi from "../models/abaririmbyi.js";
import {verifyTokenAndAdmin,verifyToken,verifyTokenAndAuthorization} from '../routes/verifyToken.js'

// router.get("/login",verifyToken, (req, res) => {
//   res.render("student/login");
// });
umuriRouter.post('/login', async (req, res) => {
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
export default umuriRouter;
