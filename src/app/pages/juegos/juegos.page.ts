import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Platform  } from '@ionic/angular';
import { CarroPage } from '../carro/carro.page';
import { ModalController, AlertController } from '@ionic/angular';

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import { File } from '@ionic-native/file/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx'

declare let cordova: any;

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {

  // https://www.freakyjolly.com/ionic-offline-storage-using-sqlite-tutorial/

  juegos = []
  
  carrito: Array<{
    id: number,
    nombre: string,
    plataforma: string,
    desarrollador: string
  }> = []

  pdf = null
  email: string

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private emailComposer: EmailComposer,
    private alertCtrl: AlertController
  ) {
    this.carrito = []
  }
  
  ngOnInit() {
    this.dataService.getJuegos().then((data) => {
      this.juegos = data;
      this.carrito = []
    })
    this.email = this.dataService.getEmail()
    console.log(this.file.dataDirectory)
    
  }

  modCarrito(id) {
    const index = this.carrito.findIndex(i => i.id === id)
    console.log(index)
    if(!this.carrito.some( juego => juego.id === id)) {
      this.carrito.push({
        id: this.juegos[id-1].id,
        nombre: this.juegos[id-1].title,
        plataforma: this.juegos[id-1].platform,
        desarrollador: this.juegos[id-1].developer,
      })
    }
    else {
      this.carrito.splice(index, 1)
    }
    
    this.carrito.sort((a, b) => a.id - b.id);

    console.log(this.carrito)
  }

  checkStatus(id) {
    if(!this.carrito.some( juego => juego.id === id)) {
      return false
    } else {
      return true
    }
  }

  async pedir() {
    const modal = await this.modalCtrl.create({
      component: CarroPage,
      componentProps:  {
        carrito: this.carrito,
        homeref: this
      }
    });
    return await modal.present()
  }

  vaciar() {
    this.carrito = []
  }

  crearPdf() {
    var docDef = {
      content: [
        { text: 'DATOS DEL PEDIDO', style: 'header'},
        { text: new Date().toTimeString(), alignment: 'right' },
        { table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Nombre', 'Plataforma', 'Desarrollador'],
              ...this.carrito.map( carro => [
                carro.id, 
                carro.nombre, 
                carro.plataforma, 
                carro.desarrollador
              ])
            ]
          }
        }
      ]
    }
    this.pdf = pdfMake.createPdf(docDef)
    this.carrito = []
    this.downloadPdf()
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdf.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' })
          this.file.writeFile(this.file.dataDirectory, 'file.pdf', blob, {replace: true}).then(fileEntry => {
            this.fileOpener.open(this.file.dataDirectory + 'file.pdf', 'application/pdf')
          })
        }
      )

      // this.pdf.getBlob(buffer => {
      //   this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
      //     .then(dirEntry => {
      //       this.file.getFile(dirEntry, 'pedido.pdf', {create: true})
      //         .then(fileEntry => {
      //           fileEntry.createWriter(writer => {
      //             writer.onwrite = () => {
      //               this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
      //                 .then(res => { }).catch(err => {
      //                   const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok']}).then(alert => alert.present())
      //                 })
      //             }
      //             writer.write(buffer)
      //           })
      //         }).catch(err => {
      //           const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok']}).then(alert => alert.present())
      //         })
      //     }).catch(err => {
      //       const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok']}).then(alert => alert.present())
      //     })
      // })
    } else {
      this.pdf.download()
    }
    this.emailPdf()
  }

  emailPdf() {
    var email = {
      to: this.email,
      attachments: [
        String(this.fileOpener.open(this.file.dataDirectory + 'file.pdf', 'application/pdf'))
      ],
      subject: 'Pedido juegos',
      body: 'Factura del pedido realizado por el usuario del correo :'+this.email+' en Free to Game.',
      isHtml: true
    }

    this.emailComposer.open(email)
  }
}
