import { Component } from '@angular/core';
import { Subscription } from '../../models/subscribe'
@Component({
  selector: 'app-subscribe',
  templateUrl: 'subscribe.page.html',
  styleUrls: ['subscribe.page.scss'],
})
export class Subscribe {

  protected subscription:Subscription = new Subscription(
    {
      currentStep:2,
      validStep:[0],
      activity:null,
      customer:null,
      agreements:null
    }
  )

  constructor() {}

  setStep(e:number){
    console.log(e);
    this.subscription.currentStep = e;
  }
}
