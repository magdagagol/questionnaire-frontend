import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BasicInfoTemplate } from '../../questionnaire';

export class OnRowItemEvent {
  action: string;
  item: BasicInfoTemplate;

  constructor(action: string, item: BasicInfoTemplate){
    this.action = action;
    this.item = item;
  }
}

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() item: BasicInfoTemplate;
  @Output() rowEvent = new EventEmitter<OnRowItemEvent>();

  delete(){
    this.rowEvent.emit(new OnRowItemEvent('DELETE', this.item));
  }

  edit(){
    this.rowEvent.emit(new OnRowItemEvent('EDIT', this.item));
  }

  show(){
    this.rowEvent.emit(new OnRowItemEvent('SHOW', this.item));
  }
}
