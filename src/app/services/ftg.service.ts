import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

interface juegosService {
  title: string;
  thumbnail: string;
  short_description: string;
  developer: string;
  platform: string;
}

@Injectable({
    providedIn: "root",
  })

export class FtgService {
    apiUrlGames = "https://free-to-play-games-database.p.rapidapi.com/api";
    
    plataforma: String;

    constructor(
        private http: HttpClient, 
        public nav: NavController, 
        public router: Router
    ) { }

    getJuegos() {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
          'X-RapidAPI-Key': '454197b472msh7b60145a52a2864p11e7f3jsn7a703c54c7ea'
        }),
      };

      return new Promise<any>((resolve) => {
        this.http.get(this.apiUrlGames + "/games", httpOptions).subscribe((data) => {
          resolve(data);
          (err) => {
            console.log(err);
          };
        });
      });
    }

    getJuegosPlataforma(plataforma: String) {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
          'X-RapidAPI-Key': '454197b472msh7b60145a52a2864p11e7f3jsn7a703c54c7ea'
        }),
      };

      return new Promise<any>((resolve) => {
        this.http.get(this.apiUrlGames + "/games?platform=" + plataforma, httpOptions).subscribe((data) => {
          resolve(data);
          (err) => {
            console.log(err);
          };
        });
      });
    }
}