import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiServicesService } from './support/api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wsba102022';
  user_id: any;
  user_type: any;
  constructor( public api:ApiServicesService, 
    private route: ActivatedRoute,
    private router: Router,
    ){
      const user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      const type = new BehaviorSubject(JSON.parse(localStorage.getItem('type')!));
      this.user_type = type.value;
      if (user.value) {
        if( this.user_type == 'admin'){
          this.router.navigate(['/home']);
          return
        }
        else if( this.user_type == 'butler'){
          this.router.navigate(['/home']);
        }
      }
      else{
        this.router.navigate(['/login']);
        return
      }
   
    }
 
}
