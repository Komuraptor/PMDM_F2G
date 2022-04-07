import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

// interface juegosService {
//     title: string;
//     thumbnail: string;
//     short_description: string;
//     developer: string;
//     platform: string;
// }

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {

  juegos: any[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  
  ngOnInit() {
    this.dataService.getJuegos().then((data) => {
      this.juegos = data;
    })
  }

}
