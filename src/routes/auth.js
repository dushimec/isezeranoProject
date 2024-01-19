import { Router } from 'express';
import Users from '../models/User.js';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config()
const authRouter = Router();
authRouter.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new Users({
            names: req.body.names,
            email: req.body.email,
            password: hashedPassword
        });

        const saveduser = await newUser.save();
        res.status(200).json(saveduser);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" }); // Send a more user-friendly response
    }
});


authRouter.post('/login', async (req, res) => {
    try {
      const { names, password } = req.body;
      const user = await Users.findOne({ names });
  
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.PASS_SEC, {
          expiresIn: '1d',
        });
  
        const { password, ...others } = user._doc;
        res.status(200).send({ ...others, accessToken });
      } else {
        res.status(400).json({ message: 'Incorrect Password !!!' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default authRouter;
