import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.page.html',
  styleUrls: ['./carro.page.scss'],
})
export class CarroPage implements OnInit {
  @Input("carrito") carrito = [];
  

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private navParams: NavParams
    ) {}

  ngOnInit() {}

  async showAlert() {
    this.alertController.create({
      header: 'Vaciar carrito',
      subHeader: '',
      message: 'Vas a vaciar el carrito. ¿Confirmar?',
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  vaciar() {
    this.navParams.data.homeref.vaciar()
    this.modalCtrl.dismiss();
  }

  crearPdf() {
    this.navParams.data.homeref.crearPdf()
    this.modalCtrl.dismiss();
  }
}
