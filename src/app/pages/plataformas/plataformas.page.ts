import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.page.html',
  styleUrls: ['./plataformas.page.scss'],
})
export class PlataformasPage implements OnInit {

  juegos: any[] = [];
  plataforma = "pc";

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getJuegosPlataforma(this.plataforma).then((data) => {
      this.juegos = data;
    })
  }

  segmentChanged(ev: any) {
    this.plataforma = ev.detail.value
    this.dataService.getJuegosPlataforma(this.plataforma).then((data) => {
      this.juegos = data;
    })
  }

}
