import { Component } from '@angular/core';
import { QuestionnaireTemplate } from '../questionnaire';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionnaire-results',
  standalone: true,
  imports: [],
  templateUrl: './questionnaire-results.component.html',
  styleUrl: './questionnaire-results.component.scss'
})
export class QuestionnaireResultsComponent {
  template: QuestionnaireTemplate;
  
  constructor(private activatedRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.template = this.activatedRoute.snapshot.data['template'];

    console.log(this.template)
  }
}
