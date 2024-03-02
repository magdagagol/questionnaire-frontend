import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { QuestionnaireTemplate } from '../questionnaire';
import { INPUT_TYPES } from './questionnaire';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuestionComponent } from '../create-questionnaire/question/question.component';

@Component({
  selector: 'app-questionnaire-form',
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
    HttpClientModule
  ],
  templateUrl: './questionnaire-form.component.html',
  styleUrl: './questionnaire-form.component.scss'
})
export class QuestionnaireFormComponent implements OnInit {
  @Input() formData: QuestionnaireTemplate;
  @Output() saveFormEvent = new EventEmitter<any>();
  form: FormGroup;
  inputTypes = Object.entries(INPUT_TYPES).map(([type, translation]) => ({type, translation}));

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.initForm(this.formData)
  }

  initForm(data: QuestionnaireTemplate){
    this.form = this.fb.group({
      title: new FormControl(data?.title),
      description: new FormControl(data?.description),
      questions: new FormArray([])
    });

    this.formData.questions.forEach((element:any) => {
      this.questions.push(
        new FormGroup({      
          id: new FormControl(element.id),   
          title: new FormControl(element.title),
          type: new FormControl(element.type),
          answers: new FormArray(this.loadAnswers(element.answers))
        })
      )
    });
  }

  loadAnswers(answers: any[]){
    let arr = answers.map((e:any) => this.createAnswerFormGroup(e));
    return arr;
  }

  createAnswerFormGroup(answer: any){
    return this.fb.group({
      id: new FormControl(answer.id),   
      label: new FormControl(answer.label),
      value: new FormControl(answer.value)
    })
  }

  select(idx: number, event: any): void {
    this.form.value.questions[idx].type = event.source.value;
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  onSubmit(){
    this.saveFormEvent.emit(this.form.value)
  }

}
