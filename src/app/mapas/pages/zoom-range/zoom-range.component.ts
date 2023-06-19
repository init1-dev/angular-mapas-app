import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface zoomCfg {
  min: number;
  max: number;
  zoomLevel: number;
  center: [number, number]
}

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss']
})

export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomCfg: zoomCfg = {
    min: 2, 
    max: 18, 
    zoomLevel: 10,
    center: [-4.0316777105573385, 39.876794058414816]
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.zoomCfg.center, // starting position [lng, lat]
      zoom: this.zoomCfg.zoomLevel, // starting zoom
    });

    this.mapa.on('zoom', (evento) => {
      this.zoomCfg.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoomend', (evento) => {
      if(this.mapa.getZoom() > this.zoomCfg.max){
        this.mapa.zoomTo( this.zoomCfg.max )
      }
      if(this.mapa.getZoom() < this.zoomCfg.min){
        this.mapa.zoomTo( this.zoomCfg.min )
      }
    })

    // Movimiento del mapa
    this.mapa.on('move', (event) => {
      const { lng, lat } = event.target.getCenter();
      this.zoomCfg.center = [lng, lat];
    })
  }

  ngOnInit(): void {

  }
  
  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomChange( value: string ) {
    this.mapa.zoomTo( Number(value) )
  }


}
