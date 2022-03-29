import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private register: DataService, public alertCtrl: AlertController, public toastCtrl: ToastController) { }

  usuario = {
    firstname: '',
    secondname: '',
    email: '',
    password: '',
    c_password: ''
  }

  ngOnInit() {
  }

  submit(usuario) {
    if(this.usuario.password === this.usuario.c_password) {
      this.presentToast();
      return this.register.register(this.usuario);
    } else {
      this.presentAlert();
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Registrado. Por favor dirijase a su correo y confirme su cuenta.',
      duration: 2000
    })
    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Datos incorrectos',
      message: 'Las contraseñas no coinciden.',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    await alert.present();
  }

}
