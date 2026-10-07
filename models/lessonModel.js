import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    description: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    lessons: {
        type: Number,
        required: true,
        min: 1
    }
});

const LessonModel = mongoose.model('Lesson', lessonSchema);
export default LessonModel;
