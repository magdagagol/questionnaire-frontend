import { Routes } from "@angular/router";
import { CreateQuestionnaireComponent } from "./create-questionnaire/create-questionnaire.component";
import { AdminPanelComponent } from "./admin-panel.component";
import { QuestionnaireListComponent } from "./questionnaire-list/questionnaire-list.component";

export const routes: Routes = [
    {
        path: '', component: AdminPanelComponent,
        children: [
            {path: '', component: QuestionnaireListComponent},
            {path: 'questionnaire', component: CreateQuestionnaireComponent}
        ]
    },
];
