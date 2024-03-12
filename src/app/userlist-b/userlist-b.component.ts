import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-userlist-b',
  templateUrl: './userlist-b.component.html',
  styleUrls: ['./userlist-b.component.css']
})
export class UserlistBComponent {
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
imageUrl:any = 'https://testkavyadigitalsolution.com/butler/api/butler/uploads/';
  addusershow: any  = true;
  editusershow:any  = false;
  name1: any;
  last_name1: any;
  address1: any;
  city1: any;
  state1: any;
  b_land: any;
  b_user: any;
  business_name: any;
  user_type: any;
  referral_code: any;
  searchTerm:any;
    constructor( public api:ApiServicesService, 
      private route: ActivatedRoute,
      private router: Router,private http: HttpClient,
      ){
        const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user_id = user.value[0]['user_id'];
        this.getlistofuser();
    }
 getlistofuser(){
  let url = "listofuser_b.php";
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
search(searchTerm:any){
  let url = "search_user_b.php";
  this.api.get_data(url, {'user_id':this.user_id,'keyword':searchTerm, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
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
    


    adduser(title:any,descrition:any,price:any){

      if (!this.selectedFile) {
        console.log('No file selected!');
        return;
      }

          const formData = new FormData();
          formData.append('file', this.selectedFile);
        
          this.http.post<any>('https://testkavyadigitalsolution.com/butler/api/butler/upload.php', formData).subscribe(
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
            text: 'Enter Title of Service',
            icon: 'error',
            confirmButtonText: 'Cool',
            timer: 1500
          })
          return
      }

      if(descrition.value == undefined || descrition.value == null || descrition.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Enter Service Description',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return
    }

    if(price.value == undefined || price.value == null || price.value == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Enter Service Price',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }
     let url = "addservice.php";
          this.api.get_data_butler(url, {
         'title':title.value, 
         'description':descrition.value,
         'price':price.value,
         'file':this.selectedFile.name,
         'butler_id':this.user_id
        })
      .subscribe(async (res: any) => { 
        if(res['status'] == 1){
          // this.listofuser = res['result']
          this.getlistofuser();
       }
        else if(res['status'] == 0){
          Swal.fire({
            title: 'Alert',
            text: 'Faild To add user',
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
    console.log(user)
    this.editusershow = true;
    this.addusershow = false;
    this.user_id1 = user.user_id
    this.user_type = user.user_type
    this.referral_code = user.referral_code
    this.business_name = user.business_name;
    this.mono1 = user.b_mono;
    this.b_land = user.b_land;
    this.email1 = user.b_email;
    this.password1= user.b_pass;
    this.address1= user.b_address;
    this.city1= user.b_city;
    this.state1= user.b_satate;
    this.b_user= user.b_user;
 }



  update(user_id1:any,business_name:any,b_user:any,email1:any,mono1:any,b_land:any,password1:any,address1:any,city1:any,state1:any){
    if(user_id1 == undefined || user_id1 == null || user_id1 == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter User Id',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }

    if(business_name == undefined || business_name == null || business_name == ''){
         Swal.fire({
           title: 'Error!',
           text: 'Please Enter business Name',
           icon: 'error',
           confirmButtonText: 'Cool',
           timer: 1500
         })
         return
     }

     
    if(b_user == undefined || b_user == null || b_user == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter Owner Name',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }

     if(email1 == undefined || email1 == null || email1 == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter Email',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }

  if(mono1 == undefined || mono1 == null || mono1 == ''){
    Swal.fire({
      title: 'Error!',
      text: 'Please Enter MoNo',
      icon: 'error',
      confirmButtonText: 'Cool',
      timer: 1500
    })
    return
}


if(b_land == undefined || b_land == null || b_land == ''){
  Swal.fire({
    title: 'Error!',
    text: 'Please Enter Landline number',
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

if(address1 == undefined || address1 == null || address1 == ''){
  Swal.fire({
    title: 'Error!',
    text: 'Enter Your Address',
    icon: 'error',
    confirmButtonText: 'Cool',
    timer: 1500
  })
  return
}

if(city1 == undefined || city1 == null || city1 == ''){
  Swal.fire({
    title: 'Error!',
    text: 'Enter Your City',
    icon: 'error',
    confirmButtonText: 'Cool',
    timer: 1500
  })
  return
}

if(state1 == undefined || state1 == null || state1 == ''){
  Swal.fire({
    title: 'Error!',
    text: 'Enter Your State',
    icon: 'error',
    confirmButtonText: 'Cool',
    timer: 1500
  })
  return
}

     let url = "update_user_b.php";
     this.api.get_data(url, {
      'user_id':user_id1,
      'b_name':business_name,
      'u_name':b_user,
      'mono':mono1,
      'land':b_land,
      'email':email1,
      'pass':password1,
      'address':address1,
      'city':city1,
      'state':state1
       })
     .subscribe(async (res: any) => { 
       if(res['status'] == 1){
        this.getlistofuser();
        Swal.fire({
          title: 'Updated',
          text: 'user information update successfully',
          icon: 'success',
          timer: 2000
        })
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
    console.log(user)
      Swal.fire({
      title: 'Delete Service',
      text: 'Are you sure you want to delete this Service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
      
     let url = "deleteuser_b.php";
     this.api.get_data(url, {
        'user_id':user.user_id,
        'id':user.id,
        'token':'sjdfakfjasdfhfjsdhfjkhdfjksdhfkjhfjkshfjksfhkjsfhjskfhjksfhjksdhjk56356645fbnhgbdhbghd'
       })
     .subscribe(async (res: any) => { 
       if(res['status'] == 1){
        Swal.fire({
          title: 'Delete',
          text: 'user information Delete successfully',
          icon: 'success',
          timer: 2000
        })
        this.getlistofuser();
      }
       else if(res['status'] == 0){
         Swal.fire({
           title: 'Alert',
           text: 'Faild To delete user',
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
