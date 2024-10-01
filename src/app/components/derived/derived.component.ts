import { NgComponentOutlet } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '@components/base/base.component';

@Component({
  selector: 'app-derived',
  standalone: true,
  imports: [BaseComponent, NgComponentOutlet],
  templateUrl: './derived.component.html',
  styleUrl: './derived.component.scss'
})
export class DerivedComponent extends BaseComponent {
  constructor(private viewContainer: ViewContainerRef) {
    super();
    this.title1 = 'Derived Component Title'; // Override the title
  }

  override getTitle() {
    return `${super.getTitle()} - ${this.title1}`; // Use base method
  }
  loadContent() {
    this.viewContainer.createComponent(BaseComponent);
  }
  getBioComponent() {
    return BaseComponent;
  }
}
