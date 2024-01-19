import { Router } from 'express';
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';
import Users from '../models/User.js';

const UserRouter = Router()



UserRouter.put('/update/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

UserRouter.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Users.findByIdAndRemove(req.params.id)
        res.status(200).json({ message: "User is deleted" })

    } catch (error) {
        res.status(500).json(error)
    }
})
UserRouter.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).send(others)
    } catch (error) {
        res.status(500).send({ Error: error })

    }
})
UserRouter.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const user = query ? await Users.find().sort({ _id: -1 }).limit(1) : await find()

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ Error: error })

    }
})

// Get user stats

UserRouter.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await Users.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ Error: error })
    }
})

export default UserRouter;