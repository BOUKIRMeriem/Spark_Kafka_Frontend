
import { Component, OnInit } from '@angular/core';

import { Client } from '../model/Client';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {
  listClients: Array<Client> = [];
  constructor(private clientService: ClientService) {
  }
  

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.clientService.getAll().subscribe((res) => {
      this.listClients = res;
      
    });
  }
}
