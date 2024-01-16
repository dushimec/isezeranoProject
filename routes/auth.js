import { Router } from 'express';
import Users from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authRouter = Router();
authRouter.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new Users({
            username: req.body.username,
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
        const { username, password } = req.body; // Destructure the username and password

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            const secret = process.env.PASS_SEC;
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: "1d" }
            );

            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });
        } else {
            res.status(400).json({ message: "Incorrect Password !!!!" });
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


export default authRouter;
