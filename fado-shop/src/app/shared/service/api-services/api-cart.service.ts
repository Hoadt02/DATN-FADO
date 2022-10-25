import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';

const httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {
  constructor(private http: HttpClient) {
  }

  findAllByCustomerId(id: number) {
    return this.http.get(`${ApiConstant.cart}?id=${id}`);
  }

  addToCart(data: any) {
    return this.http.post(ApiConstant.cart, data);
  }

  delete(id: number) {
    return this.http.delete(`${ApiConstant.cart}?id=${id}`);
  }

  deleteAll(listId: []) {
    return this.http.post(ApiConstant.cart, listId);
  }

}
