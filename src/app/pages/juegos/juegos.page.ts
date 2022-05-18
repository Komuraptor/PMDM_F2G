import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { CarroPage } from '../carro/carro.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // https://www.freakyjolly.com/ionic-offline-storage-using-sqlite-tutorial/

  juegos: any[]
  email: string
  juegosInfinite: any[]
  carrito=[]

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) { }
  
  ngOnInit() {
    
    this.dataService.getJuegos().then((data) => {
      this.juegos = data;
      for (let index = 0; index < this.juegos.length; index++) {
        this.carrito.push({
          id: this.juegos[index].id,
          added: false
        })
      }
      
    })
    
  }

  AddJuego(id) {
    var juegoId = id -1
    if(this.carrito[juegoId].added == false) {
      this.carrito[juegoId].added = true
    }
    else if(this.carrito[juegoId].added == true) {
      this.carrito[juegoId].added = false
    }
    console.log(this.carrito)
  }

  checkStatus(id) {
    var juegoId = id -1
    if(this.carrito[juegoId].added == false) {
      return false
    }
    else if(this.carrito[juegoId].added == true) {
      return true
    }
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

  async pedir() {
    const modal = await this.modalCtrl.create({
      component: CarroPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    (data) => {
      if ((data !== undefined)) {
        this.carrito = data.data;
      }
    };
  }
}
