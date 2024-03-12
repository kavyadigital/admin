import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiServicesService } from '../support/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  user_id: any;
  name:any;
  listofuser:any;
  filter:any;
c_code:any;
mono:any;
email:any;
password:any;
name1:any;
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
  changepass(np:any,cnp:any){
  if(np == undefined || np == null || np == ''){
    Swal.fire({
      title: 'Error!',
      text: 'Enter your New Password',
      icon: 'error',
      confirmButtonText: 'Cool',
      timer: 1500
    })
    return
}
if(cnp == undefined || cnp == null || cnp == ''){
  Swal.fire({
    title: 'Error!',
    text: 'Enter your confirm New Password',
    icon: 'error',
    confirmButtonText: 'Cool',
    timer: 1500
  })
  return
}

if(np != cnp){
  Swal.fire({
    title: 'Error!',
    text: 'Password not match',
    icon: 'error',
    confirmButtonText: 'Cool',
    timer: 1500
  })
  return
}

let url = "changepassword.php";
this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg','np':np,'cnp':cnp})
.subscribe(async (res: any) => { 
  if(res['status'] == 1){
    Swal.fire({
      title: 'Alert',
      text: 'Setting Saved Password Changed!',
      icon: 'success',
      timer: 2000
    })

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
  else if(res['status'] == 0){
    Swal.fire({
      title: 'Alert',
      text: 'Not Found!',
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
  })
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

 
}