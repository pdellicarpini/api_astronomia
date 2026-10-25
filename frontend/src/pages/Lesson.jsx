import { useParams, useNavigate } from 'react-router-dom';
import QuestionRenderer from '../components/lesson/QuestionRenderer';
import { questions  } from '../mocks/questions';

function Lesson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const question = questions[0];

    function handleAnswer(isCorrect) {
        console.log(isCorrect ? 'Correcto' : 'Incorrecto');
    }

    return (
        <main>
            <button onClick={ () => navigate ('/') }>Cerrar</button>
            <p>Lección { id }</p>
            <QuestionRenderer 
                key={ question._id }
                question={ question }
                onAnswer={ handleAnswer }
            />
        </main>
    ); 
}

export default Lesson;
