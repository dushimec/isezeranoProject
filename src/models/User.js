import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    names: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

const Users = model('Users', userSchema)
export default Users;