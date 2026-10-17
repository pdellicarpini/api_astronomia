import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
        unique: true,
        min: 1
    }
});

const LevelModel = mongoose.model('Level', levelSchema);
export default LevelModel;