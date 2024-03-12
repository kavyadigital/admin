import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiServicesService } from '../support/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user_id: any;
  user_type: any;
  data1: any = 0;
  data2: any = 0;
  data3: any = 0;
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,
    ){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
      this.user_id = user.value[0]['user_id'];
      this.user_type = type.value;

      this.total_user();
      this.total_user_b();
      this.total_store();
  }
  total_user(){
  let url = "totaluser.php";
  this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe(async (res: any) => { 

    if(res['status'] == 1){
   this.data1 = res['result'][0]['total_data_count'];
   }
    else if(res['status'] == 0){
   
    }
    else{
   this.data1 = '0';
    }
    }, (err: any) => {
      console.log(err);
    });
}
total_user_b(){
  let url = "totaluser_b.php";
  this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe(async (res: any) => { 

    if(res['status'] == 1){
   this.data2 = res['result'][0]['total_data_count'];
   }
    else if(res['status'] == 0){
   
    }
    else{
   this.data1 = '0';
    }
    }, (err: any) => {
      console.log(err);
    });
}
total_store(){
  let url = "total_store_count.php";
  this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe(async (res: any) => { 
    // console.log(res)
    if(res['status'] == 1){
   this.data3 = res['result'][0]['total_data_count'];
   }
    else if(res['status'] == 0){
    }
    else{
   this.data1 = '0';
    }
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

