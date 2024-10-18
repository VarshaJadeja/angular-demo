import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  title: string;
  title1: string;
  @Input() name: string = '';
  @Output() newEvent= new EventEmitter<void>();

  constructor() {
    this.title = 'Base Component';
    this.title1 = '';
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('   ChildComponent==>ngOnChanges', changes);
  // }

  // ngOnInit() {
  //   console.log('   ChildComponent==>ngOnInit');
  // }
trigger(){
  this.newEvent.emit();
}
  getTitle() {
    return this.title;
  }
}
