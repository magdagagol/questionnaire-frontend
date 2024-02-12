import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ListItemComponent, OnRowItemEvent } from './list-item/list-item.component';
import { QuestionnaireService } from '../questionnaire.service';
import { BasicInfoTemplate } from '../questionnaire';
import { debounceTime, filter, mergeMap, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule,
    RouterLink,
    ListItemComponent,
    HttpClientModule,
    MatDialogModule,
    RouterModule
  ],
  providers: [QuestionnaireService],
  templateUrl: './questionnaire-list.component.html',
  styleUrl: './questionnaire-list.component.scss'
})
export class QuestionnaireListComponent implements OnInit{
  dataSource: BasicInfoTemplate[];

  constructor(private service: QuestionnaireService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.getTemplateList().pipe(
      tap((data) => this.dataSource = data)
    ).subscribe();
  }

  rowEvent(e: OnRowItemEvent){
    if(e.action === 'EDIT') {
      console.log('event', e.item.id)

    }
    if(e.action === 'SHOW') {
      this.router.navigate([`/admin-panel/${e.item.id}`]);
    }
    if(e.action === 'RESULTS'){
      this.router.navigate([`/admin-panel/${e.item.id}/results`]);
    }
    if(e.action === 'DELETE') {
      this.dialog.open(ConfirmationDialogComponent, {width: '400px'}).afterClosed().pipe(
        filter(Boolean),
        mergeMap(() => this.service.deleteQuestionnaireTemplate(e.item.id)),
        debounceTime(300),
        tap(() => this.loadData())
      )
      .subscribe();
    }
  }

}
