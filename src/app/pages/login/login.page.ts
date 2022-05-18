import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private dataService: DataService) {
    
  }

  usuario = {
    email: '',
    password: ''
  }

  ngOnInit() {
  }

  submit() {
    this.dataService.login(this.usuario);
  }
}
