import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Subscribe } from './subscribe.page';

import { SubscribeRoutingModule } from './subscribe-routing.module';
import { ScharedModule } from '../schared/schared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScharedModule,
    SubscribeRoutingModule
  ],
  declarations: [Subscribe]
})
export class SubscribeModule {}
