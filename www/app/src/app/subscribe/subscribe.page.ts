import { Component, OnInit, OnDestroy } from '@angular/core';
import { Activity, Customer, ApiSubscribe, APISubscription } from '../../models/subscribe'
import { SubscribeService } from './subscribe.service'
import { Payload } from '../../models/payload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-subscribe',
  templateUrl: 'subscribe.page.html',
  styleUrls: ['subscribe.page.scss'],
})

export class Subscribe implements OnInit, OnDestroy {

  public activities: Activity[] | null = null;
  public findedActivities: Activity[] | null = null;
  public actionSubmitted: boolean = false;
  public loading: any;

  /**
   * Create arrai off subscription for cleaner
   */
  public subscriptions:Subscription[] = [];


  /** Var of query for search */
  public query: string = "";

  /**
   * Set default subscription object
   */
  protected subscriber: ApiSubscribe;

  /**
   * Set default Customer form object
   */
  private customer: Customer;

  /**
   * Define formData for Customer form
   */
  public formData: FormGroup;

  constructor(
    private subscriberService: SubscribeService,
    private loadingCtrl: LoadingController) { }

  ngOnInit(): void {

    //Prepare default subscription
    this.setSubscriber();

    //Prepare customers default value
    this.setCustomer();

    //Prepare form
    this.setForm();
    //Get most used activities (as example)
    this.lastActivities();
  }

  ngOnDestroy(): void {
    this.findedActivities = null;
    this.cleanSubscriptions();
  }

  setCustomer(){
    this.customer = {
      id: null,
      raison_sociale: '',
      siret: '',
      adresse_postale: '',
      email: '',
      telephone: null
    };
  }


  setSubscriber(){
    this.subscriber = new APISubscription(
      {
        currentStep: 1,
        validStep: 0,
        activity: null,
        customer: null,
        agreement: null,
        treated: false
      }
    )
  }

  /**
   * General Action and templating settings
   */
  getStepButtonTitle(): string {
    if (this.subscriber.currentStep == 3) {
      return "Je finalise mon achat";
    }
    return "Poursuivre ma souscription ";
  }

  async showLoading(message: string) {
    let loading = await this.loadingCtrl.create({
      message: message,
    });
    loading.present();
    return loading;
  }

  /**
   * Step 1
   */
  lastActivities() {
    this.activities = null;
    this.subscriberService.getActivities().subscribe((res: Payload) => {
      if (res.status == true) {
        this.activities = res.data;
        this.findedActivities = this.activities;
      }
    })
  }

  searchActivities() {
    this.activities = null;
    this.subscriptions.push(
      this.subscriberService.searchActivities(this.query).subscribe((res: Payload) => {
        if (res.status == true) {
          this.findedActivities = null;
          this.findedActivities = res.data;
        }
      })
    )
  }

  filter(e: any) {
    if (this.query.length >= 2) {
      this.actionSubmitted = true;
      this.findedActivities = null;
      setTimeout(() => {
        this.searchActivities();
      }, 2000)
    }
  }

  setStep(e: number) {
    this.subscriber.currentStep = e;
  }

  setActivity(activity: Activity) {
    this.subscriber.activity = activity;
    this.query = activity.name;
    setTimeout(() => {
      this.subscriber.currentStep = 2
    }, 2000)
  }

  getAutocompleteLabel(): string {
    if (this.actionSubmitted && this.subscriber.currentStep == 1) {
      return "Sélectionnez une activité dans le résultat";
    }
    return "Les activité le plus recherche";
  }

  /**
   * Step 2 
   * Save Customer
   */
  setForm() {
    this.formData = new FormGroup(
      {
        raison_sociale: new FormControl(this.customer.raison_sociale, { validators: [Validators.required] }),
        siret: new FormControl(this.customer.siret, { validators: [Validators.required] }),
        adresse_postale: new FormControl(this.customer.siret, { validators: [Validators.required] }),
        email: new FormControl(this.customer.email, { validators: [Validators.required] }),
        telephone: new FormControl(this.customer.telephone, { validators: [Validators.required] }),
      }, { updateOn: "blur" }
    );
  }

  saveCustomer() {
    if (this.formData.status == 'VALID') {
      this.actionSubmitted = true;
      this.subscriber.customer = { ...this.subscriber.customer, ...this.formData.value }
      this.saveSubscriber(this.formData.value);
    }
  }

  async saveSubscriber(data: Customer) {
    this.loading = await this.showLoading('Nous traitons vos données...');
    setTimeout(() => {
      this.subscriptions.push(
        this.subscriberService.saveSubscription(this.subscriber).subscribe((res: Payload) => {
          if (res.status == true) {
            this.loading.spinner = null;
            this.loading.message = 'Merci pour votre patience'
            setTimeout(() => {
              this.loading.dismiss().then(() => {
                this.subscriber.currentStep = 3;
              });
            }, 2000)
          }
        })
      );
    },2000)
    
  }

  /**
   * Step 3
   * Download Pdf
   */
  async downloadPDF() {
    this.subscriptions.push(
      this.subscriberService.downloadPDF(this.subscriber.agreement).subscribe(
        (event: HttpEvent<any>) => {
          console.log(event);
          switch (event.type) {
            case HttpEventType.Sent:
              //console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              //console.log('Response header has been received!');
              break;
            case HttpEventType.DownloadProgress:
              //progress = Math.round(event.loaded / data.size * 100);
              //console.log(`Dowloaded .. ${this.progress}%`);
              break;
            case HttpEventType.Response:
              const url = (window.URL || window.webkitURL).createObjectURL(event.body);
              window.open(url, '_blank');
  
              // rewoke URL after 15 minutes
              setTimeout(() => {
                window.URL.revokeObjectURL(url);
              }, 15 * 60 * 1000);
          }
        }
      )  
    );
  }

  /**
   * Refresh methods
   * @param event 
   */
  handleRefresh(event:any) {
    setTimeout(() => {
      this.reset()
      event.target.complete();
    }, 2000);
  }

  /**
   * Clean subscription for not leak memory
   */
  cleanSubscriptions(){
    if(this.subscriptions.length>0){
      this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
  }

  /**
   * Reset  on refresch
   */
  reset():void{
    this.query = '';
    this.setSubscriber();
    this.setCustomer();
    this.setForm();
  }
}
