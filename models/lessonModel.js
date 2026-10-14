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
    order: {
        type: Number,
        required: true,
        min: 1
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    totalXp: {
        type: Number,
        required: true, 
    }
}); 

const LessonModel = mongoose.model('Lesson', lessonSchema);
export default LessonModel;
