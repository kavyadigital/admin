import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user_id: any;
  user_type: any;
  admindetails: any;
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,
    ){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      // const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
      // console.log(type)
      this.user_id = user.value[0]['user_id'];
      this.getmyprofiledeatils();
      // this.user_type = type.value;
      // for this id - admin@123 pass Daylhe@98
  }

getmyprofiledeatils(){
  let url = "profile.php";
  this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe(async (res: any) => { 
    if(res['status'] == 1){
      this.admindetails = res['result']['0']
   }
    else if(res['status'] == 0){
      // Swal.fire({
      //   title: 'Alert',
      //   text: 'Users Not Found!',
      //   icon: 'error',
      //   timer: 2000
      // })
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
    }, (err: any) => {
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


