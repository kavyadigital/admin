import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from 'src/app/support/api-services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:any;
  pass:any;
  user_type: any;
    constructor( public api:ApiServicesService, 
      private route: ActivatedRoute,
      private router: Router,
      ){
        // const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));

        // const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        // const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
        // console.log(type)
        // this.user_type = type.value;
        // if (user.value) {
        //   if( this.user_type == 'admin'){
        //     this.router.navigate(['/home']);
        //     return
        //   }
        //   else if( this.user_type == 'butler'){
        //     this.router.navigate(['home']);
        //   }

          
        // }
        // else{
        //   this.router.navigate(['/login']);
        //   return
        // }
        
    }
 
    signup(btype:any,bname:any,c_code:any,mono:any,email:any,pass:any){
     

      if(btype.value == undefined || btype.value == null || btype.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Please Select Butler Type',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return   
      }

      if(bname.value == undefined || bname.value == null || bname.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Please Enter Butler Name',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return   
      }

      if(c_code.value == undefined || c_code.value == null || c_code.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Please Select country code',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 1500
        })
        return   
      }

      if(mono.value == undefined || mono.value == null || mono.value == ''){
        Swal.fire({
          title: 'Error!',
          text: 'Please Enter Mobile number',
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
////////////////////////////butler login ///////////////////////////////////////////

  let url1 = "registerbutler.php";
  this.api.get_data_butler(url1, { 'btype':btype.value,'bname':bname.value,'c_code':c_code.value,'mono':mono.value,'Email':email.value, 'Pass':pass.value, 'token':'qwertyuioasdfghjkxcvbnm98485dfghrdfghjjhfg'})
  .subscribe(async (res: any) => { 
    if(res['status'] == 1){
      Swal.fire({
        title: bname.value+':: Your has been created successfully please wait for admin approval',
        icon: 'success',
        timer: 2000
      })
    }
    else if(res['status'] == 0){
      Swal.fire({
        title: 'Alert',
        text: 'Please Check Your details!',
        icon: 'error',
        timer: 2000
      })
    }


  // let userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    }, (err: any) => {
      console.log(err);
    });

}

    ///////////////////////////////////////////////////////////////////////////////////////////////
  }

