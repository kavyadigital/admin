import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-testapproval',
  templateUrl: './testapproval.component.html',
  styleUrls: ['./testapproval.component.css']
})
export class TestapprovalComponent {
  selectedAnswer: any = '';
  count:any = 0;
  user_id: any;
  user_type: any;
  btluser: any;
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,
    ){
      // const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      // const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
      // console.log(type)
      // this.user_id = user.value[0]['user_id'];
      // this.user_type = type.value;
      this.getmyprofiledeatils();
  }
  getmyprofiledeatils(){
    let url = "getQustionList.php";
    this.api.get_data_butler(url, { 'user_id':100, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
    .subscribe(async (res: any) => { 
      if(res['status'] == 1){
        this.btluser = res['result']
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



  submit(question:any) {
    const count = new BehaviorSubject(JSON.parse(localStorage.getItem('count')!));
    if(count.value != 4){
      if(question.ans == this.selectedAnswer)
      {
        this.count =this.count+1;
        localStorage.setItem('count', JSON.stringify(this.count));
        this.selectedAnswer = '';
        this.getmyprofiledeatils();
      }
      else{
        this.getmyprofiledeatils();
        this.selectedAnswer = '';
      }
    }
    else{
      Swal.fire({
        title: 'Welcome',
        text: 'Your Eligible for the Butler',
        icon: 'success',
        timer: 2000
      }) 
      const count = localStorage.removeItem('count');
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
      this.user_id = user.value[0]['user_id'];
      this.user_type = type.value;
      let url = "UpdateTestStatus.php";
      this.api.get_data_butler(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
      .subscribe(async (res: any) => { 
        if(res['status'] == 1){
          this.btluser = res['result']
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
        }, (err: any) => {
          console.log(err);
        });



      this.router.navigateByUrl('home');
    }
      
}
}