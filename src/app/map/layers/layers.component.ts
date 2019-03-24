import { Component } from '@angular/core';

import { circle, geoJSON, latLng, Layer, marker, polygon, tileLayer, LatLng } from 'leaflet';

import { LayersModel } from './layers.model';

@Component({
  selector: 'app-map-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.less']
})
export class LayersComponent {

  // Open Street Map definition
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: true,
    layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };

  circle = {
    id: 'circle',
    name: 'Circle',
    enabled: true,
    layer: circle([ 46.95, -122 ], { radius: 5000 })
  };

  polygon = {
    id: 'polygon',
    name: 'Polygon',
    enabled: true,
    layer: polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]])
  };

  square = {
    id: 'square',
    name: 'Square',
    enabled: true,
    layer: polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
  };

  marker = {
    id: 'marker',
    name: 'Marker',
    enabled: true,
    layer: marker([ 46.879966, -121.726909 ], {
      title: 'Ora ora'
    })
  };

  geoJSON = {
    id: 'geoJSON',
    name: 'Geo JSON Polygon',
    enabled: true,
    layer: geoJSON(
      ({
        type: 'Polygon',
        coordinates: [[
          [ -121.6, 46.87 ],
          [ -121.5, 46.87 ],
          [ -121.5, 46.93],
          [ -121.6, 46.87 ]
        ]]
      }) as any,
      { style: () => ({ color: '#ff7800' })})
  };

  // Form model object
  model = new LayersModel(
    [ this.LAYER_OSM ],
    this.LAYER_OSM.id,
    [ this.circle, this.polygon, this.square, this.marker, this.geoJSON ]
  );

  // Values to bind to Leaflet Directive
  layers: Layer[];
  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer,
    },
    overlays: {
      Circle: this.circle.layer,
      Square: this.square.layer,
      Polygon: this.polygon.layer,
      Marker: this.marker.layer,
      GeoJSON: this.geoJSON.layer
    }
  };

  optionsSpec: any = {
    zoom: 10,
    center: [46.879966, -121.726909]
  };

  options = {
    zoom: this.optionsSpec.zoom,
    center: latLng(this.optionsSpec.center)
  };

  zoom = this.optionsSpec.zoom;
  center = latLng(this.optionsSpec.center);

  onCenterChange(center: LatLng) {
    console.log("TCL: onCenterChange -> center", center);
  }

  onZoomChange(zoom: number) {
    console.log("TCL: onZoomChange -> zoom", zoom);
  }

  goToSpb() {
    this.center = latLng(59.935981779824935, -329.724841142268);
    this.zoom = 12;
  }

  constructor() {
    this.apply();
  }

  apply() {

    // Get the active base layer
    const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));

    // Get all the active overlay layers
    const newLayers = this.model.overlayLayers
      .filter((l: any) => l.enabled)
      .map((l: any) => l.layer);
    newLayers.unshift(baseLayer.layer);

    this.layers = newLayers;

    return false;
  }
}
