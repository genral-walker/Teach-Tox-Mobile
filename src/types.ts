export interface Option {
    id: string;
    answer: string;
}

export interface User {
    name: string;
    avatar: string;
}

export interface APIQuestionResponse {
    type: string;
    id: number;
    playlist: string;
    description: string;
    image: string;
    question: string;
    options: Option[];
    user: User;
}

export interface APIAnswerResponse {
    id: number;
    correct_options: Option[];
}

export type Question = APIQuestionResponse & {
    correct_option_id?: string;
};

export interface APIError {
    message: string;
}

export type AnswersWrapperType = React.ForwardRefExoticComponent<
    {
        options: Option[];
        correct_option_id: string;
    } & React.RefAttributes<unknown>
>;
