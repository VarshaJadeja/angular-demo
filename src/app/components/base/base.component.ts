import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  title: string;
  title1: string;
  @Input() name: string = '';
  constructor() {
    this.title = 'Base Component';
    this.title1 = '';
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('   ChildComponent==>ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('   ChildComponent==>ngOnInit');
  }

  getTitle() {
    return this.title;
  }
}
