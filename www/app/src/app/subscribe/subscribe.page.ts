import { Component,AfterViewInit, OnInit } from '@angular/core';
import { Activity, Customer, Subscription } from '../../models/subscribe'
import { SubscribeService } from './subscribe.service'
import { Payload } from '../../models/payload';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: 'subscribe.page.html',
  styleUrls: ['subscribe.page.scss'],
})

export class Subscribe {

  public activities: Activity[] | null = null;
  public findedActivities: Activity[] | null = null;
  public actionSubmitted = false;

  /** Var of query for search */
  public query: string = "";

  protected subscription: Subscription = new Subscription(
    {
      currentStep: 1,
      validStep: [0],
      activity: null,
      customer: null,
      agreements: null,
      treated:false
    }
  )

  private customer : Customer = {
    id:null,
    raison_sociale:'',
    siret:'',
    adresse_postale:'',
    email:'',
    telephone: null
  };

  public formData : any;

  constructor(private subscribeService: SubscribeService) {}

  ngOnInit(){
    this.setForm();
    this.lastActivities();
  }

  ngAfterViewInit(): void {}


  /**
   * General Action and templating settings
   */
  getStepButtonTitle(): string {
    if (this.subscription.currentStep == 3) {
      return "Je finalise mon achat";
    }
    return "Next";
  }

  /**
   * Step 1
   */
  lastActivities() {
    this.activities=null;
    this.subscribeService.getActivities().subscribe((res: Payload) => {
      if (res.status == true) {
        this.activities = res.data;
        this.findedActivities=this.activities;
      }
    })
  }

  searchActivities() {
    this.activities=null;
    this.subscribeService.searchActivities(this.query).subscribe((res: Payload) => {
      if (res.status == true) {
        this.findedActivities=null;
        this.findedActivities = res.data;
      }
    })
  }

  filter(e: any) {
    if (this.query.length >= 2) {
      setTimeout(()=>{
        this.actionSubmitted=true;
        this.searchActivities();
      }, 2000)
    }
  }

  setStep(e: number) {
    console.log(e);
    this.subscription.currentStep = e;
  }

  setActivity(activity:Activity){
    this.subscription.activity = activity;
    this.query = activity.name;
    setTimeout(()=>{
      this.subscription.currentStep=2
    }, 2000)
  }

  getAutocompleteLabel():string{
    if (this.actionSubmitted && this.subscription.currentStep==1) {
      return "Sélectionnez une activité dans le résultat";
    }
    return "Les activité le plus recherche";
  }

  /**
   * Step 2 - Save Customer
   */
  setForm() {
    this.formData = new FormGroup(
      {
        raison_sociale: new FormControl(this.customer.raison_sociale, { validators: [Validators.required] }),
        siret: new FormControl(this.customer.siret, { validators: [Validators.required] }),
        adresse_postale: new FormControl(this.customer.siret, { validators: [Validators.required] }),
        email: new FormControl(this.customer.email, { validators: [Validators.required] }),
        telephone:new FormControl(this.customer.telephone, { validators: [Validators.required] }),
      }, { updateOn: "blur" }
    );
  }

  saveCustomer(){
    console.log(this.formData.status, this.formData.value, this.formData)
    if (this.formData.status == 'VALID') {
      this.actionSubmitted = true;
      console.log(this.formData.value)
      this.subscription.customer=this.formData.value;
      this.saveSubscription(this.formData.value);
    }
  }

  saveSubscription($data:Customer){
    this.subscribeService.saveSubscription(this.subscription).subscribe((res: Payload) => {
      if (res.status == true) {
        this.activities = res.data;
        this.findedActivities=this.activities;
      }
    })
  }

}
