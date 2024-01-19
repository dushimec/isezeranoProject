import { Router } from 'express';
const ubwitabireRoute = Router();
import Ubwitabire from '../models/ubwitabireM.js';
import Nyobozi from '../models/nyobozi.js'
import { verifyTokenAndAuthorization } from './verifyToken.js';

ubwitabireRoute.post('/submit', async (req, res) => {
    const { names, present } = req.body;
  
    // Save attendance record to MongoDB
    const attendance = new Ubwitabire({
      names,
      present: present === 'on',
    });
  
    try {
      await attendance.save();
      res.send(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  ubwitabireRoute.post('/login', async (req, res) => {
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
  export default ubwitabireRoute;