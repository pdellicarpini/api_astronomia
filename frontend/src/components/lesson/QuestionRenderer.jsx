import MultipleChoice from "../questions/MultipleChoice";
import Matching from "../questions/Matching";

function QuestionRenderer({ question, onAnswer }) {
    switch(question.type) {
        case 'multiple-choice':
            return  <MultipleChoice question={ question } onAnswer={ onAnswer }/>
        case 'true-false':
            return  <MultipleChoice className='true-false' question={ question } onAnswer={ onAnswer } />
        case 'matching':
            return <Matching question={ question } onAnswer={ onAnswer } />
        default:
            return <p>Tipo de pregunta no soportado: { question.type }</p>
    }
}

export default QuestionRenderer;