import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgxMatFileInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

