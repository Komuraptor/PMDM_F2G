import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private dataService: DataService, private storage: Storage) {
    
  }

  usuario = {
    email: '',
    password: ''
  }

  ngOnInit() {
  }

  submit() {
    this.storage.get(this.usuario.email).then((val) => {
      console.log(val)
    }).catch((error) => {
      // this.storage.set(this.usuario.email)
    })
    this.dataService.login(this.usuario);
  }
}
