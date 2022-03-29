import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  @ViewChild('lista', {static: true}) 
  lista: IonList;
  usuarios: any[] = [];

  constructor(
    public router: Router, 
    private dataService: DataService,
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    ) { 
      if (router.getCurrentNavigation().extras.state) {
        const token = this.router.getCurrentNavigation().extras.state;
      }
    }

  ngOnInit() {
    this.dataService.getUsuarios().then((data) => {
      this.usuarios = data.data;
    })
  }

  activar(usuario) {
    this.dataService.activar(usuario);
    this.lista.closeSlidingItems();
    this.recargar();
  }

  desactivar(usuario) {
    this.dataService.desactivar(usuario);
    this.lista.closeSlidingItems();
    this.recargar();
  }

  async eliminar(usuario) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Borrar usuario',
      message: '¿Borrar usuario?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      },{
        text: 'Si',
        handler: () => {
          this.dataService.eliminar(usuario);
          this.recargar();
        }
      }]
    });
    await alert.present();
  }

  recargar(){
    this.ngOnInit();
    setTimeout(() => {
      this.router.navigateByUrl('/tabs/usuarios')
    }, 500);
    this.router.navigateByUrl('/tabs/usuarios')
    this.ngOnInit();
    this.router.navigateByUrl('/tabs/usuarios')
  }
}
