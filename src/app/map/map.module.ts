import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map.component';
import { CoreComponent } from './core/core.component';
import { LayersComponent } from './layers/layers.component';
import { NgForLayersComponent } from './layers/ngfor-layers.component';
import { BaseLayersComponent } from './layers/baselayers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    LeafletModule.forRoot()
  ],
  declarations: [
    MapComponent,
    CoreComponent,
    BaseLayersComponent,
    LayersComponent,
    NgForLayersComponent,
  ],
  exports: [
    MapComponent
  ],
  bootstrap: [ MapComponent ],
  providers: [ ]
})
export class MapModule { }
