import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipOption, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { INPUT_TYPES } from '../create-questionnaire';
import { CreateQuestionnaireComponent } from '../create-questionnaire.component';

@Component({
  selector: 'app-question',
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
    CommonModule
  ],
  providers: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit{
  @ViewChild('list') list: MatChipListbox;
  inputTypes = Object.entries(INPUT_TYPES).map(([type, translation]) => ({type, translation}));
  selectedInputType: string;

  @Input() idx: number;
  @Output() remove = new EventEmitter<number>();
  parentContainer = inject(ControlContainer);

  form!: FormGroup;

  get parentFormArray() {
    return this.parentContainer.control as FormArray;
  }

  get questions () {
    return this.parentFormArray.at(this.idx) as FormGroup;
  }

  constructor(){}

  ngOnInit(): void {
    console.log("'array", this.parentFormArray.at(this.idx), this.idx)
    console.log('aaa', this.questions.controls)

    this.questions.addControl('question', new FormControl(''));
    this.questions.addControl('answers', new FormArray([]));
    this.questions.addControl('type', new FormControl(''));
      
  }

  select(): void {
    console.log('selected', (this.list.selected as MatChipOption).value);
    this.selectedInputType = (this.list.selected as MatChipOption).value;

    this.type.setValue(((this.list.selected as MatChipOption).value));
  }

  removeQuestion(idx: number){
    console.log('remove', idx)
    this.remove.emit(idx);
  }

  get answers() {
    return this.questions.get('answers') as FormArray;
  } 

  get type() {
    return this.questions.get('type') as FormControl;
  } 

  addAnswer(){
    console.log('aaa', this.answers)
    this.answers.push(new FormControl(''));
  }

  removeAnswer (item: number){
    console.log('aaa', this.answers)
    this.answers.removeAt(item)
  }

  ngOnDestroy(): void {
    this.parentFormArray.removeAt(this.idx);
  }
}
