import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'ordering', 'matching'],
        required: true
    },
    options: {
        type: [{type: String, trim: true}],
        validate: {
            validator: (value) => value.length >= 2,
            message: 'Debe haber al menos 2 opciones'
        }
    },
    matchOptions: {
        type: [{type: String, trim: true}],
        required: function() {
            return this.type === 'matching';
        },
        default: undefined
    },
    correctAnswer: {
        type: Number,
        required: function() {
            return this.type === 'multiple-choice' || this.type === 'true-false';
        }
    },
    explanation: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'intermediate', 'hard'],
        required: true,
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    }
});

questionSchema.pre('validate', function () {
    // autocompletar 'verdadero' y 'falso' en orden para el type 'true-false'
    if (this.type === 'true-false') {
        this.options = ['Verdadero', 'Falso'];
    }

    const { type, matchOptions, correctAnswer } = this;
    const options = this.options ?? []; // evitar options: null 

    // validaciones dependiendo el type 
    if ((type === 'multiple-choice' || type === 'true-false') && typeof correctAnswer === 'number' && !(Number.isInteger(correctAnswer) && correctAnswer >= 0 && correctAnswer < options.length)) {
        this.invalidate('correctAnswer', 'El índice de la respuesta correcta no es válido');
    }

    if (type === 'matching' && matchOptions && matchOptions.length !== options.length) {
        this.invalidate('matchOptions', 'matchOptions debe tener la misma cantidad de elementos que options');
    }

    if (type !== 'matching') this.matchOptions = undefined;
    if (type === 'ordering' || type === 'matching') this.correctAnswer = undefined;
});

const QuestionModel = mongoose.model('Question', questionSchema);
export default QuestionModel;
