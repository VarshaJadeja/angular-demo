import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  title: string;
  title1: string;
  constructor() {
    this.title = 'Base Component Title';
    this.title1 = '';
  }

  getTitle() {
    return this.title;
  }
}
