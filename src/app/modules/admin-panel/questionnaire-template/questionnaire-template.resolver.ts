import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuestionnaireTemplate } from '../questionnaire';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const questionnaireTemplateResolver: ResolveFn<Observable<QuestionnaireTemplate>> = (route, state) => {
  return inject(HttpClient).get<QuestionnaireTemplate>(`http://localhost:8080/api/template/${route.paramMap.get('id')}`);
};
