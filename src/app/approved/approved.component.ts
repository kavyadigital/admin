import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit{
  user_id: any;
  user_type: any;
  btluser: any;
  request: any;
  skk: any;
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,
    ){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
      // console.log(type)
      this.user_id = user.value[0]['user_id'];
      this.user_type = type.value;
      this.getrequsteduser();
      // for this id - admin@123 pass Daylhe@98
  }
  ngOnInit(): void {
    this.getrequsteduser();
  }

 async getrequsteduser(){
  let url = "acceptedrequest.php";
  this.api.get_data_butler(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe((res: any) => { 
    if(res['status'] == 1){
      this.skk = res['result'];
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
changeStatus(data:any,st:any){
  let url = "approverequestofuser.php";
  this.api.get_data_butler(url, {'status':st, 'user_id_butler':data.user_id_butler,'user_id_user':data.user_id_user, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe((res: any) => { 
    if(res['status'] == 1){
      this.getrequsteduser();
      Swal.fire({
        title: 'Success',
        text: res['result'],
        icon: 'success',
        timer: 2000
      })
   }
    else if(res['status'] == 0){
      Swal.fire({
        title: 'Alert',
        text: res['result'],
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
    }, (err: any) => {
      console.log(err);
    });
  }
  chat(s:any){
    console.log(s)
  
    let navigationExtras: NavigationExtras = {
      state: {
        s,
      },
    };
    this. router.navigate(['chat'],navigationExtras);

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