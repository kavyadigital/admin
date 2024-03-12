import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent {
  selectedFile: File | undefined;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.log('No file selected!');
      return;
    }
  console.log(this.selectedFile.name)
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    // Send POST request to PHP backend API
    this.http.post<any>('https://linktally.in/butler/skk/butler/butler/upload.php', formData).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        // Handle success (if needed)
      },
      error => {
        console.error('Error uploading file:', error);
        // Handle error (if needed)
      }
    );
  }
}