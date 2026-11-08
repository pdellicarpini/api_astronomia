import { kMaxLength } from "buffer";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: [1000, 'El comentario no puede superar los 1000 caracteres.']
    }
}, { timestamps: true });

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'El título no puede superar los 100 caracteres.']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['Preguntas', 'Observaciones', 'Astrofotografía', 'Otro'],
        required: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: [2000, 'El texto no puede superar los 2000 caracteres.']
    },
    likes: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    reports: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    comment: [commentSchema]
}, { timestamps: true });

const PostModel = mongoose.model('Post', postSchema);
export default PostModel;
