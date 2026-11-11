import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userProgressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

userProgressSchema.index(
    { user: 1, lesson: 1 },
    { unique: true }
);

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;
