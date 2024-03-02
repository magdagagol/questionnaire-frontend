import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuestionnaireTemplate } from '../questionnaire';

export const editQuestionnaireResolver: ResolveFn<QuestionnaireTemplate> = (route, state) => {
  return inject(HttpClient).get<QuestionnaireTemplate>(`http://localhost:8080/api/template/${route.paramMap.get('id')}`);
};
