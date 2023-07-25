import { Component } from '@angular/core';
import { Activity, Subscription } from '../../models/subscribe'
import { SubscribeService } from './subscribe.service'
@Component({
  selector: 'app-subscribe',
  templateUrl: 'subscribe.page.html',
  styleUrls: ['subscribe.page.scss'],
})
export class Subscribe {

  public activities:Activity[] = [];

  protected subscription:Subscription = new Subscription(
    {
      currentStep:1,
      validStep:[0],
      activity:null,
      customer:null,
      agreements:null
    }
  )

  constructor(private subscribeService:SubscribeService) {}

  ngAfterViewInit() {
    this.getActivities();
  }

  getActivities() {
    this.subscribeService.getActivities().subscribe((res:any) => {
      console.log('getActivities', res)
      if (res.succes == true) {

        this.activities = res.payload.data;
      }
    })
  }

  setStep(e:number){
    console.log(e);
    this.subscription.currentStep = e;
  }
  getStepButtonTitle():string{
      if(this.subscription.currentStep==3){
        return "Je finalise mon achat";
      }
      return "Next";
  }
}
