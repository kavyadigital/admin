import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiServicesService } from '../support/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hotdeal',
  templateUrl: './hotdeal.component.html',
  styleUrls: ['./hotdeal.component.css']
})
export class HotdealComponent {
  imageUrl:any = 'https://testkavyadigitalsolution.com/shopfindy/api/admin/uploads/';
  list1: any = false;
  list2: any = false;
  list3: any = false;
  listofuser:any;
  user_id: any;
  selectedFile: File | undefined;
  fileBase64: string | undefined;
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,private http: HttpClient
    ){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user_id = user.value[0]['user_id'];
      // this.get_list_of_hot_list();
    }
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }
    

    get_list_of_hot_list(type:any){
      this.listofuser = '';
      let url = "list_of_hotdeal.php";
  this.api.get_data(url, {'user_id':this.user_id,'type':type, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe(async (res: any) => { 
    if(res['status'] == 1){
      this.listofuser = res['result']
   }
    else if(res['status'] == 0){
   }
    else{
     Swal.fire({
        title: 'Alert',
        text: 'Service Error!',
        icon: 'error',
        timer: 2000
      }) 
    }
    }, err => {
      console.log(err);
    });
    }
  show(type:any){
   if(type == 1){
    this.get_list_of_hot_list(5)
          this.list1 = true;
          this.list2 = false;
          this.list3 = false;
    }
    if(type == 2){
      this.get_list_of_hot_list(10)
        this.list1 = false;
          this.list2 = true;
          this.list3 = false;
      }
      if(type == 3){
        this.get_list_of_hot_list(20)
        this.list1 = false;
          this.list2 = false;
          this.list3 = true;
      }
    }

    adduser(title:any,descrition:any,Type:any){
      if (!this.selectedFile) {
        console.log('No file selected!');
        return;
      }
          const formData = new FormData();
          formData.append('file', this.selectedFile);
         this.http.post<any>('https://testkavyadigitalsolution.com/shopfindy/api/admin/upload.php', formData).subscribe(
            response => {
              console.log('File uploaded successfully:', response);
            },
            error => {
              console.error('Error uploading file:', error);
              // Handle error (if needed)
            }
          );

         if(title.value == undefined || title.value == null || title.value == ''){
          Swal.fire({
            title: 'Error!',
            text: 'Enter Title',
            icon: 'error',
            confirmButtonText: 'Cool',
            timer: 1500
          })
          return
      }

      if(descrition.value == undefined || descrition.value == null || descrition.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Enter Description',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return
    }

    if(Type.value == undefined || Type.value == null || Type.value == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Select Hot Deal type',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }

 
     let url = "add_hot_deal.php";
          this.api.get_data(url, {
         'title':title.value, 
         'description':descrition.value,
         'type':Type.value,
         'file':this.selectedFile.name,
        })
      .subscribe(async (res: any) => { 
        if(res['status'] == 1){
        this.listofuser = res['result']
        Swal.fire({
          title: 'Alert',
          text: 'Added in Deal List',
          icon: 'success',
          timer: 2000
        })
       }
        else if(res['status'] == 0){
          Swal.fire({
            title: 'Alert',
            text: 'Faild To add Store',
            icon: 'error',
            timer: 2000
          })
        }
        else{
    
          Swal.fire({
            title: 'Alert',
            text: 'Service Error!',
            icon: 'error',
            timer: 2000
          }) 
        }

        }, err => {
          console.log(err);
        });
  }





  logout(){
    const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      if (user.value){
        Swal.fire(
          'Logout!',
          'success'
        )
        const user = localStorage.removeItem('user');
        const type = localStorage.removeItem('type');
        this.router.navigate(['/login']);
      }
      else{
    return
      }
  }
}
