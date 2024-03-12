import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  // baseUrl:any = 'https://linktally.in/butler/skk/butler/butler/';
  // baseUrl_bt: any = "https://linktally.in/butler/skk/butler/butler/";

  baseUrl:any = 'https://testkavyadigitalsolution.com/shopfindy/api/admin/';
  baseUrl_bt: any = "https://testkavyadigitalsolution.com/butler/api/butler/";


  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  blog: any;
  constructor(public http: HttpClient) { }
  /////////////////////////////////////////admin//////////////////////////////////////////////
  get_data(url: any, options: any) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      URL: any = this.baseUrl + url;
    return this.http.post(URL, JSON.stringify(options), headers)
      .map(res => {
              return res
      })
      .catch(error => {
        return error;
      });
  }

///////////////////////////////////////////////butler service////////////////////////////////////

get_data_butler(url: any, options: any) {
  const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    URL: any = this.baseUrl_bt + url;
  return this.http.post(URL, JSON.stringify(options), headers)
    .map(res => {
            return res
    })
    .catch(error => {
      return error;
    });
}
////////////////////////////////////////////////////
//  d(url:any){
//     const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' })
//     return this.http.post(url,headers)
//       .map(res => {
//               return res
//       })
//       .catch(error => {
//         return error;
//       });
//   }
}
