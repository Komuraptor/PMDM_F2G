import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
// import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  juegos: any[]
  email: string
  juegosInfinite: any[]
  fav=[]

  constructor(
    private dataService: DataService,
    private storage: Storage,
    // private login: LoginPage
  ) { }
  
  ngOnInit() {
    
    this.dataService.getJuegos().then((data) => {
      this.juegos = data;
      // this.email = this.login.usuario.email
      for (let index = 0; index < this.juegos.length; index++) {
        this.fav.push({
          id: this.juegos[index].id,
          fav: false
        })
      }

      // this.storage.get(this.email).then((val) => {
      //   console.log(val)
      // }).catch((error) => {
      //   // this.email = this.login.usuario.email
      //   for (let index = 0; index < this.juegos.length; index++) {
      //     this.fav.push({
      //       id: this.juegos[index].id,
      //       fav: false
      //     })
      //   }
      //   this.storage.set(this.email, this.fav)
      // })
      // this.fav[3].fav = true
      
    })
    
  }

  Favorite(id) {
    if(this.fav[id-1].fav == false) {
      this.fav[id-1].fav = true
    }
    else if(this.fav[id-1].fav == true) {
      this.fav[id-1].fav = false
    }
    console.log(this.fav)
  }

  checkFav(id) {
    if(this.fav[id-1].fav == false) {
      return false
    }
    else if(this.fav[id-1].fav == true) {
      return true
    }
  }
}
