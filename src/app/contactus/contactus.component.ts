import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
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
  save(number:any,email:any) {
    if(number.value == undefined || number.value == null || number.value == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Enter Your contact no',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 1500
      })
      return
  }

  const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
      const result: boolean = expression.test(email.value);
      
      if(result == false){
        Swal.fire({
          title: 'Error!',
          text: 'Enter Valid Email Id',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return
      }
  if(email.value == undefined || email.value == null || email.value == ''){
    Swal.fire({
      title: 'Error!',
      text: 'Enter Your Email id',
      icon: 'error',
      confirmButtonText: 'Cool',
      timer: 1500
    })
    return
}

let url = "addcontact_us.php";
this.api.get_data(url, {
   'mono':number.value, 
   'email':email.value,
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
