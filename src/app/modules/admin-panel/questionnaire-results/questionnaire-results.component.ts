import { Component, OnInit, inject } from '@angular/core';
import { QuestionnaireTemplate } from '../questionnaire';
import { ActivatedRoute } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../questionnaire-list/confirmation-dialog/confirmation-dialog.component';
import { debounceTime, filter, mergeMap, takeUntil, tap } from 'rxjs';
import { LeaveCycleManager } from '../../../shared/leave-cycle-manager';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questionnaire-results',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './questionnaire-results.component.html',
  styleUrl: './questionnaire-results.component.scss'
})

export class QuestionnaireResultsComponent extends LeaveCycleManager implements OnInit {
  template: QuestionnaireTemplate;
  
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private http: HttpClient){
    super();
  }

  ngOnInit(): void {
    this.template = this.activatedRoute.snapshot.data['template'];
    this.prepareData();
  }

  addOnBlur = true;

  announcer = inject(LiveAnnouncer);

  
  remove(value: any, answerId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {width: '400px'}).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.http.patch<any>(`http://localhost:8080/api/answer/${answerId}/${value}`, null)),
      debounceTime(300),
      tap(() => this.loadData()),
      takeUntil(this.$destroy)
    )
    .subscribe();
  }

  loadData(){
    this.http.get<QuestionnaireTemplate>(`http://localhost:8080/api/template/${this.template.id}`).pipe(
      tap(data => {
        this.template = data;
        this.prepareData();
      })
    )
    .subscribe();
  }

  prepareData(){
    this.template.questions.forEach(question => {
      question.answers.map(a => {if ((typeof a.value) === 'string') a.value = (a.value as string).split('|')});
    });
  }
}
