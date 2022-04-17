import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  juegos: any[]
  juegosInfinite: any[]

  constructor(
    private dataService: DataService,
  ) { }
  
  ngOnInit() {
    
    this.dataService.getJuegos().then((data) => {
      this.juegos = data;
      console.log(this.juegos)
    })
    
  }

  // loadData(event) {
  //   console.log(this.juegos)
  //   setTimeout(() => {
  //     console.log('Done');
  //     event.target.complete();

  //     if (this.juegos.length === 1000) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  //   event.target.complete();
  // }

  // addInfinite() {
  //   for (let index = 0; index < 5; index++) {
  //     this.juegosInfinite.push({
  //       title: this.juegos[index].title,
  //       thumbnail: this.juegos[index].thumbnail,
  //       developer: this.juegos[index].developer,
  //       platform: this.juegos[index].platform,
  //       short_description: this.juegos[index].short_description
  //     });
  //   }
  // }
}
