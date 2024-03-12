import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent {
  selectedFile: File | undefined;
  fileBase64: string | undefined;
  user_id: any;
  listofuser:any;
  filter:any;
c_code:any;
mono:any;
email:any;
password:any;
c_code1:any;
mono1:any;
email1:any;
password1:any;
user_id1:any;
imageUrl:any = 'https://testkavyadigitalsolution.com/shopfindy/api/admin/uploads/';
  addusershow: any  = true;
  editusershow:any  = false;
    constructor( public api:ApiServicesService, 
      private route: ActivatedRoute,
      private router: Router,private http: HttpClient){
        const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user_id = user.value[0]['user_id'];
        this.get_list_of_store();
    }
    get_list_of_store(){
  let url = "list_of_work_flow.php";
  this.api.get_data(url, {'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
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


    logout(){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        if (user.value){
          Swal.fire(
            'Logout!',
            'success'
          )
          const user = localStorage.removeItem('user');
          this.router.navigate(['/login']);
        }
        else{
      return
        }
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }
    


    adduser(title:any,descrition:any){
      // if (!this.selectedFile) {
      //   console.log('No file selected!');
      //   return;
      // }
      //     const formData = new FormData();
      //     formData.append('file', this.selectedFile);
      //    this.http.post<any>('https://testkavyadigitalsolution.com/shopfindy/api/admin/upload.php', formData).subscribe(
      //       response => {
      //         console.log('File uploaded successfully:', response);
      //       },
      //       error => {
      //         console.error('Error uploading file:', error);
      
      //       }
      //     );

         if(title.value == undefined || title.value == null || title.value == ''){
          Swal.fire({
            title: 'Error!',
            text: 'Enter Qustion',
            icon: 'error',
            confirmButtonText: 'Cool',
            timer: 1500
          })
          return
      }

      if(descrition.value == undefined || descrition.value == null || descrition.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Enter Answer',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return
    }

 
     let url = "add_work_flow.php";
          this.api.get_data(url, {
         'title':title.value, 
         'description':descrition.value,
        //  'file':this.selectedFile.name,
        })
      .subscribe(async (res: any) => { 
        if(res['status'] == 1){
          // this.listofuser = res['result']
          this.get_list_of_store();
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

  edituser(user:any){
    this.editusershow = true;
    this.addusershow = false;
    this.c_code1 = user.c_code;
    this.mono1 = user.mobile;
    this.email1 = user.email;
    this.password1= user.pass;
    this.user_id1 = user.user_id
    // mono:any;
    // email:any;
    // password:any;
    console.log(this.c_code)
  }

  update(c_code1:any,mono1:any,email1:any,password1:any,user_id1:any){
    // this.addusershow = false;
    // this.editusershow = true;
    if(c_code1 == undefined || c_code1 == null || c_code1 == ''){
         Swal.fire({
           title: 'Error!',
           text: 'Select Your Country Code',
           icon: 'error',
           confirmButtonText: 'Cool',
           timer: 1500
         })
         return
     }

     if(mono1 == undefined || mono1 == null || mono1 == ''){
       Swal.fire({
         title: 'Error!',
         text: 'Enter Your Mobile Number',
         icon: 'error',
         confirmButtonText: 'Cool',
         timer: 1500
       })
       return
   }


   if(email1 == undefined || email1 == null || email1 == ''){
     Swal.fire({
       title: 'Error!',
       text: 'Enter Your Email id',
       icon: 'error',
       confirmButtonText: 'Cool',
       timer: 1500
     })
     return
 }


 if(password1 == undefined || password1 == null || password1 == ''){
   Swal.fire({
     title: 'Error!',
     text: 'Enter Your Password',
     icon: 'error',
     confirmButtonText: 'Cool',
     timer: 1500
   })
   return
}

     let url = "updateuser.php";
     this.api.get_data(url, {
        'c_code':c_code1, 
        'mono':mono1,
        'email':email1,
        'password':password1,
        'user_id':user_id1
       })
     .subscribe(async (res: any) => { 
       if(res['status'] == 1){
        this.get_list_of_store();
      }
       else if(res['status'] == 0){
         Swal.fire({
           title: 'Alert',
           text: 'Faild To update user',
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
   
     // let userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
       }, err => {
         console.log(err);
       });
  }

  deleteuser(user:any){
    // console.log(user)
      Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
      
     let url = "delete_work_flow.php";
     this.api.get_data(url, {
        'id':user.id,
        'token':'sjdfakfjasdfhfjsdhfjkhdfjksdhfkjhfjkshfjksfhkjsfhjskfhjksfhjksdhjk56356645fbnhgbdhbghd'
       })
     .subscribe(async (res: any) => { 
       if(res['status'] == 1){
        this.get_list_of_store();
      }
       else if(res['status'] == 0){
         Swal.fire({
           title: 'Alert',
           text: 'Faild To delete Store',
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
   
     // let userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
       }, err => {
         console.log(err);
       });
      }
    });
    
  }
}

