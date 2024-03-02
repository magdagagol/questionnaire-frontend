import { Routes } from "@angular/router";
import { CreateQuestionnaireComponent } from "./create-questionnaire/create-questionnaire.component";
import { AdminPanelComponent } from "./admin-panel.component";
import { QuestionnaireListComponent } from "./questionnaire-list/questionnaire-list.component";
import { questionnaireTemplateResolver } from "./questionnaire-template/questionnaire-template.resolver";
import { QuestionnaireTemplateComponent } from "./questionnaire-template/questionnaire-template.component";
import { QuestionnaireResultsComponent } from "./questionnaire-results/questionnaire-results.component";
import { EditQuestionnaireComponent } from "./edit-questionnaire/edit-questionnaire.component";
import { editQuestionnaireResolver } from "./edit-questionnaire/edit-questionnaire.resolver";

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
            },
            {
                path: ':id/results',
                component: QuestionnaireResultsComponent,
                resolve: {
                    template: questionnaireTemplateResolver
                }
            },
            {
                path: ':id/edit',
                component: EditQuestionnaireComponent,
                resolve: {
                    template: editQuestionnaireResolver
                }
            },
        ]
    },
];
