import MultipleChoice from "../questions/MultipleChoice";

function QuestionRenderer({ question, onAnswer }) {
    switch(question.type) {
        case 'multiple-choice':
        case 'true-false':
            return  <MultipleChoice question={ question } onAnswer={ onAnswer }/>
        default:
            return <p>Tipo de pregunta no soportado: { question.type }</p>
    }
}

export default QuestionRenderer;