import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule,LoadingController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribeService } from './subscribe.service';
import { Subscribe } from './subscribe.page';
import { SubscribeRoutingModule } from './subscribe-routing.module';
import { ScharedModule } from '../schared/schared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ScharedModule,
    SubscribeRoutingModule
  ],
  declarations: [Subscribe],
  providers: [SubscribeService]
})
export class SubscribeModule {}
