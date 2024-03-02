import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionnaireTemplate } from '../questionnaire';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuestionnaireFormComponent } from '../questionnaire-form/questionnaire-form.component';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-edit-questionnaire',
  standalone: true,
  imports: [    
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    QuestionnaireFormComponent
  ],
  templateUrl: './edit-questionnaire.component.html',
  styleUrl: './edit-questionnaire.component.scss'
})
export class EditQuestionnaireComponent implements OnInit {
  template: QuestionnaireTemplate;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient){}

  ngOnInit(): void {
    this.template = this.activatedRoute.snapshot.data['template'];
  }

  save(event: any){
    console.log('edit form save', event)
    this.http.put(`http://localhost:8080/api/template/${this.template.id}`, event).pipe(
      debounceTime(300),
      tap(() => this.router.navigateByUrl('/admin-panel'))
    ).subscribe();
  }
}
