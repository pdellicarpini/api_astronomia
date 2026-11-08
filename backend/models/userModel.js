import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    streak: {
        current: {
            type: Number,
            default: 0
        },
        lastActivityAt: {
            type: Date,
            default: null
        }
    },
    level: {
        type: String,
        default: 'Aprendiz del Cielo'
    }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;