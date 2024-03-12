import { Component } from '@angular/core';
import { ApiServicesService } from '../support/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  data: any;
  user_name: any;
  name_butler: any;
  user_id_butler: any;
  user_id_user: any;
  skk: any;
  chat:any;
  constructor( public api:ApiServicesService,private router: Router){
    this.data = this.router.getCurrentNavigation()?.extras.state
    this.user_name = this.data['s']['user_name'];
    this.name_butler = this.data['s']['name_butler'];
    this.user_id_butler = this.data['s']['user_id_butler'];
    this.user_id_user = this.data['s']['user_id_user'];
    this.getchatlist();
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

getchatlist(){
      let url = "getchatdetails.php";
    this.api.get_data_butler(url, {'user_id_butler':this.user_id_butler,'user_id_user':this.user_id_user, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
    .subscribe((res: any) => { 
      if(res['status'] == 1){
        this.skk = res['result'];
     }
      else if(res['status'] == 0){
      }
      else{
      }
      }, (err: any) => {
        console.log(err);
      });
  
}
chatchat(chat:any){
    let url = "savechatlist.php";
    this.api.get_data_butler(url, {'msg':chat, 'user_id_butler':this.user_id_butler,'user_id_user':this.user_id_user, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
    .subscribe((res: any) => { 
      if(res['status'] == 1){
        this.chat = '';
        this.getchatlist();
        // Swal.fire({
        //   title: 'Success',
        //   text: res['result'],
        //   icon: 'success',
        //   timer: 2000
        // })
     }
      else if(res['status'] == 0){
        // Swal.fire({
        //   title: 'Alert',
        //   text: res['result'],
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
}
