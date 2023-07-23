import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscribe } from './subscribe.page';

const routes: Routes = [
  {
    path: '',
    component: Subscribe,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribeRoutingModule {}
