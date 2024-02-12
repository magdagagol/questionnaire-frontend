import { INPUT_TYPES } from "./create-questionnaire/create-questionnaire";

export interface QuestionnaireTemplate {
    id: number;
    title: string;
    description: string;
    questions: Question[];
}

export interface QuestionnaireTemplateDto {
    title: string;
    description: string;
    questions: Question[];
}

export interface Question {
    id: number;
    title: string;
    answers: Answer[];
}

export interface Answer {
    id: number;
    value: string;
    label: string;
}

export interface BasicInfoTemplate {
    id: number;
    title: string;
    description: string;
}