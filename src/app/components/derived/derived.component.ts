import {
  CommonModule,
  NgComponentOutlet,
  NgTemplateOutlet,
  UpperCasePipe,
} from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '@components/base/base.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { HighlightDirective } from 'app/directives/highlight.directive';

@Component({
  selector: 'app-derived',
  standalone: true,
  imports: [
    BaseComponent,
    NgComponentOutlet,
    MatButtonModule,
    FormsModule,
    UpperCasePipe,
    NgTemplateOutlet,
    CommonModule,
    HighlightDirective,
    UserListComponent
  ],
  templateUrl: './derived.component.html',
  styleUrl: './derived.component.scss',
})
export class DerivedComponent extends BaseComponent {
  myProperty!: '';
  selectedTopping: string = '';
  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;
  constructor(private viewContainer: ViewContainerRef) {
    super();
    this.title1 = 'Derived Component Title'; // Override the title
  }

  override getTitle() {
    return `${super.getTitle()} - ${this.title1}`; // Use base method
  }
  loadContent() {
    this.dynamicContainer.clear();
    this.dynamicContainer.createComponent(BaseComponent);
  }
  getBaseComponent() {
    return BaseComponent;
  }
  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}
