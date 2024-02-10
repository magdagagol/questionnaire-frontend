import {Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { INPUT_TYPES } from './create-questionnaire';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-create-questionnaire',
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
    MatTooltipModule
  ],
  templateUrl: './create-questionnaire.component.html',
  styleUrl: './create-questionnaire.component.scss'
})
export class CreateQuestionnaireComponent implements OnInit{
  form!: FormGroup;
  inputTypes = Object.entries(INPUT_TYPES).map(([type, translation]) => ({type, translation}));

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.form = this.fb.group({
      title: [],
      description: [],
      questions: this.fb.array([
      ])
    })
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  addQuestion(){
    this.questions.push(this.fb.control(''))
  }

  removeQuestion(item: number){
    this.questions.removeAt(item)
  }

  onSubmit(){
    console.log('form', this.form.value)
  }
}
