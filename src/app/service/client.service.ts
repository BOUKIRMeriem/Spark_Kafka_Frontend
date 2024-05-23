import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:8081/customers';

  constructor(private httpClient: HttpClient) {
   
   }

  getAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.url);
  }
}
