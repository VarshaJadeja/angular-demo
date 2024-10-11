import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Temp } from '@models/temp.model';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
})
export class TemplateDrivenFormComponent {
  user: Temp = {
    name:'',
    password:''
  };
  OnSubmit(tempform: NgForm) {
    console.log(tempform.value);
  }
}
