import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listClients: Array<Client> = [];
  nbrAbonnee = 0;
  nbrDeAbonnee = 0;
  chartOptions: any;
  isloading: boolean = false;
  constructor(private clientService: ClientService, private cdr: ChangeDetectorRef) {
  }

  getAllCustomer(){
    this.clientService.getAll().subscribe((res) => {
      this.listClients = res;
      res.forEach(element => {
        if (element.prediction === 0){
          this.nbrAbonnee = this.nbrAbonnee + 1;
        } else if (element.prediction === 1){
          this.nbrDeAbonnee = this.nbrDeAbonnee + 1;
        }
      });
      this.updateChartOptions(this.nbrAbonnee, this.nbrDeAbonnee);
    });
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  updateChartOptions(nbr1: number, nbr2: number): void {
    console.log('res : ', nbr1, nbr2);
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "taux de désabonnement des clients et des abonnés"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "",
        dataPoints: [
          { y: nbr1, name: "Nombre d'abonnés" },
          { y: nbr2, name: "Nombre de désabonnés" }
        ]
      }]
    };
    this.isloading = true;
    this.cdr.detectChanges(); 
  }

  

}
