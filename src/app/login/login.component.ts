import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:any;
  pass:any;
  user_type: any;
    constructor( public api:ApiServicesService, 
      private route: ActivatedRoute,
      private router: Router)
      {
        const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
     if(user)
        {
             this.router.navigate(['/login']);
        }
          else
        {
            this.router.navigate(['/home']);
        }
  }
 
    login(email:any, pass:any){
      const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
      const result: boolean = expression.test(email);
      
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
  
      if(email == undefined || email == null || email == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Please Enter Your Email id',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return
  
  
        
      }
      if(pass == undefined || pass == null || pass == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Please Enter Your Password',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return
      }
///////////////////////////////////////////////////////////////////////
      let url = "login.php";
      this.api.get_data(url, { 'Email':email, 'Pass':pass, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
      .subscribe(async (res: any) => { 
        if(res['status'] == 1){
          Swal.fire({
            title: 'Welcome !'+ email,
            icon: 'success',
            timer: 2000
          })
          localStorage.setItem('user', JSON.stringify(res['result']));
         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                      this.router.navigateByUrl(returnUrl);
                      console.log(returnUrl)
        }
        else if(res['status'] == 0){
          Swal.fire({
            title: 'Alert',
            text: 'Please Check Your login credentials!',
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
  }
    ///////////////////////////////////////////////////////////////////////////////////////////////

