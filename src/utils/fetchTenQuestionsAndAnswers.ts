import config from '../constants/config';
import { APIAnswerResponse, APIError, APIQuestionResponse, Question } from '../types';

type ErrorType = (message: string) => void;

const fetchQuestionAndAnswer = async (setError: ErrorType) => {
    try {
        const res = await fetch(`${config.BASE_URL}/for_you`);
        const newQuestion: APIQuestionResponse = await res.json();

        const answerRes = await fetch(`${config.BASE_URL}/reveal?id=${newQuestion.id}`);
        const answer: APIAnswerResponse = await answerRes.json();

        return {
            ...newQuestion,
            correct_option_id: answer.correct_options[0].id,
        };
    } catch (_error) {
        const { message } = _error as APIError;
        setError(message);
    }
};

const fetchTenQuestionsAndAnswers = async (
    setLoading: (bool: boolean) => void,
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
    setError: ErrorType
) => {
    try {
        setLoading(true);

        const newQuestions = await Promise.all(
            Array.from({ length: 10 }, () => fetchQuestionAndAnswer(setError))
        );

        setQuestions((prev) => {
            const map = new Map([...prev, ...newQuestions].map((pos) => [pos?.id, pos]));
            const uniques = [...map.values()];

            return uniques as Question[];
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchTenQuestionsAndAnswers;
