import { Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from '../create-questionnaire/question/question.component';
import { QuestionnaireTemplate } from '../questionnaire';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-questionnaire-template',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    CommonModule,
    QuestionComponent,
    HttpClientModule,
    RouterModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  templateUrl: './questionnaire-template.component.html',
  styleUrl: './questionnaire-template.component.scss'
})
export class QuestionnaireTemplateComponent {
  template: QuestionnaireTemplate;
  form: FormGroup;

  dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient){}


  ngOnInit(): void {
    this.template = this.activatedRoute.snapshot.data['template'];

    console.log('template',this.template)


    this.template.questions.forEach(question => {
        question.answers.forEach(answer => {
          this.dynamicForm.addControl(`${answer.id}`, new FormControl(''))
        });
      
    })
  }  

  submitDynamic(){
    console.log('test1', this.dynamicForm.value)
    this.http.post(`http://localhost:8080/api/answer`, this.dynamicForm.value).subscribe();
  }
  
}
