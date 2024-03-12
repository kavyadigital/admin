import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
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
  addusershow: any  = true;
  editusershow:any  = false;
    constructor( public api:ApiServicesService, 
      private route: ActivatedRoute,
      private router: Router,
      ){
        const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user_id = user.value[0]['user_id'];

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
  save(title:any,desco:any) {
    if(title.value == undefined || title.value == null || title.value == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Enter Your Title',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }

 
  if(desco.value == undefined || desco.value == null || desco.value == ''){
    Swal.fire({
      title: 'Error!',
      text: 'Enter Your Description',
      icon: 'error',
      confirmButtonText: 'Cool',
      timer: 1500
    })
    return
}

let url = "add_about_us.php";
this.api.get_data(url, {
   'title':title.value, 
   'description':desco.value,
  })
.subscribe(async (res: any) => { 
  if(res['status'] == 1){
    Swal.fire({
      title: 'success',
      text: 'Added to Show in Application',
      icon: 'success',
      timer: 2000
    })
    
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
}
