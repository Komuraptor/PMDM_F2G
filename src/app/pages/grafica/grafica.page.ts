import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined

  juegos = []

  generos = []
  generosCount = []
  generosLabel = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getJuegos().then((data) => {
      this.juegos = data;
      for (let {genre} of this.juegos ) {
        this.generos[genre] = {
          genre,
          count: this.generos[genre] ? this.generos[genre].count + 1 : 1
        }
      }
      
      this.generos = Object.values(this.generos)

      for (let index = 0; index < this.generos.length; index++) {
        this.generosLabel.push(this.generos[index].genre)
      }
      for (let index = 0; index < this.generos.length; index++) {
        this.generosCount.push(this.generos[index].count)
      }
    })

    this.barChartData.datasets[0].data = this.generosCount;

    this.chart?.update();
  }

  public barCharOptions: ChartConfiguration['options'] = {
    
    responsive: true,
    maintainAspectRatio: false,
    
    scales: {
      x: {},
      y: {
        min: 0,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {

    labels: this.generosLabel,
    datasets: [
      { data: this.generos, label: 'Géneros' }
    ]
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  async generar() {
    this.barChartData.datasets[0].data = this.generosCount;

    this.chart?.update();
  }
}
