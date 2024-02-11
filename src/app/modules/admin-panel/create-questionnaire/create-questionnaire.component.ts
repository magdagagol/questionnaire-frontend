import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatChipListbox, MatChipOption, MatChipsModule} from '@angular/material/chips';
import { INPUT_TYPES } from './create-questionnaire';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { Router } from '@angular/router';

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
    MatTooltipModule,
    CommonModule,
    QuestionComponent
  ],
  templateUrl: './create-questionnaire.component.html',
  styleUrl: './create-questionnaire.component.scss'
})
export class CreateQuestionnaireComponent implements OnInit{
  @ViewChild('list') list: MatChipListbox;
  form!: FormGroup;
  inputTypes = Object.entries(INPUT_TYPES).map(([type, translation]) => ({type, translation}));
  selectedInputType: string;

  constructor(private fb: FormBuilder, private router: Router){}


  ngOnInit(): void {
    this.formInit();
  }  
  
  select(): void {
    console.log('selected', (this.list.selected as MatChipOption).value);
    this.selectedInputType = (this.list.selected as MatChipOption).value;
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
    this.questions.push(new FormGroup({}));
  }

  removeQuestion(item: number){
    this.questions.removeAt(item)
  }

  onSubmit(){
    console.log('form', this.form.value)
    let data = localStorage.getItem('dataSource');
    let dataSource = [];
    data ? dataSource = JSON.parse(data) : '';
    dataSource.push(this.form.value)

    localStorage.setItem('dataSource', JSON.stringify(dataSource));

    
  }

  cancel(){
    this.router.navigateByUrl('/admin-panel');
  }
}
