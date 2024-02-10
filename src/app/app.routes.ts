import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { QuestionnaireComponent } from './modules/questionnaire/questionnaire.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    //{path: 'admin-panel', component: AdminPanelComponent},
    {path: 'admin-panel', loadChildren: () => import('./modules/admin-panel/admin-routes').then(mod => mod.routes)},
    {path: 'questionnaire', component: QuestionnaireComponent}
];
