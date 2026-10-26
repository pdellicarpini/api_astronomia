import { useState } from 'react';

function useLessonSession(initialQuestions) {
    const [queue, setQueue] = useState(initialQuestions);
    const [mistakes, setMistakes] = useState(0);
    const [lastResult, setLastResult] = useState(null);

    const total = initialQuestions.length;
    const currentQuestion = queue[0];
    const finished = queue.length === 0;
    const progress = (total - queue.length) / total;

    function answer(isCorrect) {
        setLastResult(isCorrect);
    }

    function next() {
        const [first, ...rest] = queue;

        if (lastResult) {
            setQueue(rest);
        } else {
            setQueue([...rest, first]);
            setMistakes(mistakes + 1);
        }
        setLastResult(null);
    }

    return { currentQuestion, progress, lastResult, mistakes, finished, answer, next }
}

export default useLessonSession;