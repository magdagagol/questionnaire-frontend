import { Routes } from "@angular/router";
import { CreateQuestionnaireComponent } from "./create-questionnaire/create-questionnaire.component";
import { AdminPanelComponent } from "./admin-panel.component";
import { QuestionnaireListComponent } from "./questionnaire-list/questionnaire-list.component";
import { questionnaireTemplateResolver } from "./questionnaire-template.resolver";
import { QuestionnaireTemplateComponent } from "./questionnaire-template/questionnaire-template.component";

export const routes: Routes = [
    {
        path: '', component: AdminPanelComponent,
        children: [
            {
                path: '', 
                component: QuestionnaireListComponent
            },
            {
                path: 'questionnaire', 
                component: CreateQuestionnaireComponent
            },
            {
                path: ':id',
                component: QuestionnaireTemplateComponent,
                resolve: {
                    template: questionnaireTemplateResolver
                }
            }
        ]
    },
];
