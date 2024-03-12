import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiServicesService } from '../support/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
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
  name1: any;
  l_name1: any;
    constructor( public api:ApiServicesService, 
      private route: ActivatedRoute,
      private router: Router,
      ){
        const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user_id = user.value[0]['user_id'];
        this.cards();
    }
    cards(){
      let url = "cards_list.php";
      this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
      .subscribe(async (res: any) => { 
        if(res['status'] == 1){
          this.listofuser = res['result']
      }
        else if(res['status'] == 0){
          Swal.fire({
            title: 'Alert',
            text: 'Users Not Found!',
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




  deleteuser(user:any){
    Swal.fire({
      title: 'Delete Crad',
      text: 'Are you sure you want to delete this Card?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
      
     let url = "delete_card.php";
     this.api.get_data(url, {
        'user_id':user.user_id,
        'id':user.id,
        'token':'545ewq5e4w5e45we5we5we5e5we5w4ew5ew5e45w4e5fnffhf'
       })
     .subscribe(async (res: any) => { 
       if(res['status'] == 1){
        this.cards();
      }
       else if(res['status'] == 0){
         Swal.fire({
           title: 'Alert',
           text: 'Faild To delete card',
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

