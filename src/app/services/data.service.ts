import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
  })

export class DataService {
    apiUrl = "http://semillero.allsites.es/public/api";
    usuarios: [];

    token: any;
    tipo: String;

    constructor(
        private http: HttpClient, 
        public nav: NavController, 
        public router: Router
    ) { }

    login(usuario) {
        return new Promise((resolve) => {
        this.http
            .post<any>(this.apiUrl + "/login", {
            email: usuario.email,
            password: usuario.password,
            })
            .subscribe((data) => {
            this.token = data.data.token;
            this.tipo = data.data.type;
            console.log(data);
            resolve(data);
            console.log(this.token);
            });
        }).then(() => {
        this.redirect(this.tipo)
        });
    }

    redirect(tipo: String) {
        if (tipo === "a") {
        this.router.navigateByUrl('/tabs')
        } else {
        this.router.navigateByUrl('/usuario')
        }
    }
}