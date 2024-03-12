import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  user_id: any;
  memberships : any;
  payments:any;
  displayList: any = 'payments';
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,
    ){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user_id = user.value[0]['user_id'];
      
    }
    
    ngOnInit(): void {
      this.getpaymentdeatils();
      // this.getpaymentdeatils_membership();
  }
  showMemberships(): void {
    this.displayList = 'memberships';
  }

  showPayments(): void {
    this.displayList = 'payments';
  }

  trackById(index: number, item: any): number {
    return item.id; // Assuming 'id' is a unique identifier for memberships and payments
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

    getpaymentdeatils(){
    let url = "payment_history.php";
    this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
    .subscribe(async (res: any) => { 
      if(res['status'] == 1){
     this.payments = res['result'];
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


    
    // getpaymentdeatils_membership(){
    //   let url = "payment_history_membership.php";
    //   this.api.get_data(url, { 'user_id':this.user_id, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
    //   .subscribe(async (res: any) => { 
    //     if(res['status'] == 1){
    //    this.memberships = res['result'];
    //    }
    //     else if(res['status'] == 0){
    //       Swal.fire({
    //         title: 'Alert',
    //         text: 'Not Found!',
    //         icon: 'error',
    //         timer: 2000
    //       })
    //     }
    //     else{
    //       Swal.fire({
    //         title: 'Alert',
    //         text: 'Service Error!',
    //         icon: 'error',
    //         timer: 2000
    //       }) 
    //     }
    //     })
    //   }

}
