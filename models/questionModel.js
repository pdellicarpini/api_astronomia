import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true
    }, 
    options: {
        type: [String],
        required: true,
        trim: true
    },
    correctAnswer: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
        trim: true
    }
});

const QuestionModel = mongoose.model('Question', questionSchema);
export default QuestionModel;
