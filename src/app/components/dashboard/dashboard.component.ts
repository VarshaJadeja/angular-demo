import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UrlShortenerService } from '@services/url-shortener.service';
import { DerivedComponent } from '@components/derived/derived.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgxMatFileInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    DerivedComponent
  ],
  providers: [UrlShortenerService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent {
  fileInputControl = new FormControl();
  originalFileSize: number | null = null;
  compressedFileSize: number | null = null;
  file: File | null = null;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });
  url: string = '';
  shortenedUrl: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private urlShortenerService: UrlShortenerService
  ) {}

  shortenUrl(): void {
    const data = {
      longUrl: this.url,
      createdBy: localStorage.getItem('UserName'),
    };
    this.urlShortenerService.shortenUrl(data).subscribe(
      (response) => {
        this.shortenedUrl = response.shortUrl;
      },
      (error) => {
        console.error('Error shortening URL', error);
      }
    );
  }

  onFileChange(event: any) {
    console.log(event.target.files[0].size);
    var file1 = event.target;
    if (file1.files.length > 0) {
      this.file = file1.files[0];
      this.originalFileSize = file1.files[0].size;
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  compressImage(file: File): Observable<File> {
    const imageType = file.type || 'image/jpeg';
    const reader = new FileReader();

    reader.readAsDataURL(file);

    return new Observable((observer) => {
      reader.onload = (ev) => {
        const img = new Image();
        img.src = ev.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const maxWidth = 500;
          const maxHeight = 500;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const widthRatio = maxWidth / width;
            const heightRatio = maxHeight / height;
            const ratio = Math.min(widthRatio, heightRatio);

            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                observer.next(
                  new File([blob], file.name, {
                    type: imageType,
                    lastModified: Date.now(),
                  })
                );
                observer.complete();
              } else {
                observer.error(new Error('Failed to create blob'));
              }
            },
            imageType,
            0.2 // Adjust quality as needed
          );
        };
      };

      reader.onerror = (error) => observer.error(error);
    });
  }

  onCompressClick(): void {
    if (this.file) {
      this.compressImage(this.file).subscribe(
        (compressedFile) => {
          this.compressedFileSize = compressedFile.size;
          console.log(`Original file size: ${this.originalFileSize} bytes`);
          console.log(`Compressed file size: ${this.compressedFileSize} bytes`);
          this.cdr.detectChanges();
        },
        (error) => console.error('Compression failed', error)
      );
    }
  }
}
