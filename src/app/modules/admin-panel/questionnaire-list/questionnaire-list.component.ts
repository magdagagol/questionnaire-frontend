import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ListItemComponent, OnRowItemEvent } from './list-item/list-item.component';

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule,
    RouterLink,
    ListItemComponent
  ],
  templateUrl: './questionnaire-list.component.html',
  styleUrl: './questionnaire-list.component.scss'
})
export class QuestionnaireListComponent implements OnInit{
  dataSource: any[];

  ngOnInit(): void {
    let data = localStorage.getItem('dataSource');
    data ? this.dataSource = JSON.parse(data) : '';


    console.log('data', this.dataSource)
  }

  rowEvent(e: OnRowItemEvent){
    if(e.action === 'EDIT') {
      console.log('event', e.item)
    }
    if(e.action === 'DELETE') {
      console.log('delete', this.dataSource.indexOf(e.item))
      this.dataSource =  this.dataSource.filter(obj => obj !== e.item);

      console.log(this.dataSource)
      localStorage.setItem('dataSource', JSON.stringify(this.dataSource));
    }
  }

}
