import { Component, OnInit, OnDestroy } from '@angular/core';
import { Activity, Customer, Subscription } from '../../models/subscribe'
import { SubscribeService } from './subscribe.service'
import { Payload } from '../../models/payload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { HttpEvent, HttpEventType } from '@angular/common/http';


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

  /** Var of query for search */
  public query: string = "";

  /**
   * Set default subscription object
   */
  protected subscription: Subscription = new Subscription(
    {
      currentStep: 1,
      validStep: [0],
      activity: null,
      customer: null,
      agreement: null,
      treated: false
    }
  )

  /**
   * Set default Customer form object
   */
  private customer: Customer = {
    id: null,
    raison_sociale: '',
    siret: '',
    adresse_postale: '',
    email: '',
    telephone: null
  };

  /**
   * Define formData for Customer form
   */
  public formData: FormGroup;

  constructor(
    private subscribeService: SubscribeService,
    private loadingCtrl: LoadingController) { }

  ngOnInit(): void {
    //Prepare form
    this.setForm();
    //Get most used activities (as example)
    this.lastActivities();
  }

  ngOnDestroy(): void {
    this.findedActivities = null;
  }

  /**
   * General Action and templating settings
   */
  getStepButtonTitle(): string {
    if (this.subscription.currentStep == 3) {
      return "Je finalise mon achat";
    }
    return "Poursuivre ma souscription ";
  }

  async showLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message,
    });
    this.loading.present();
  }

  /**
   * Step 1
   */
  lastActivities() {
    this.activities = null;
    this.subscribeService.getActivities().subscribe((res: Payload) => {
      if (res.status == true) {
        this.activities = res.data;
        this.findedActivities = this.activities;
      }
    })
  }

  searchActivities() {
    this.activities = null;
    this.subscribeService.searchActivities(this.query).subscribe((res: Payload) => {
      if (res.status == true) {
        this.findedActivities = null;
        this.findedActivities = res.data;
      }
    })
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
    console.log(e);
    this.subscription.currentStep = e;
  }

  setActivity(activity: Activity) {
    this.subscription.activity = activity;
    this.query = activity.name;
    setTimeout(() => {
      this.subscription.currentStep = 2
    }, 2000)
  }

  getAutocompleteLabel(): string {
    if (this.actionSubmitted && this.subscription.currentStep == 1) {
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
        telephone: new FormControl(this.customer.telephone, { validators: [Validators.required] }),
      }, { updateOn: "blur" }
    );
  }

  saveCustomer() {
    //console.log(this.formData.status, this.formData.value, this.formData)
    if (this.formData.status == 'VALID') {
      this.actionSubmitted = true;
      this.subscription.customer = { ...this.subscription.customer, ...this.formData.value }
      this.saveSubscription(this.formData.value);
    }
  }

  saveSubscription(data: Customer) {
    this.showLoading('Nous traitons vos données...');
    this.subscribeService.saveSubscription(this.subscription).subscribe((res: Payload) => {
      console.log(res)
      if (res.status == true) {
        this.loading.spinner = null;
        this.loading.message = 'Merci pour votre patience'
        setTimeout(() => {
          this.loading.dismiss().then(() => {
            this.subscription.currentStep = 3;
          });
        }, 2000)
      }
    })
  }

  /**
   * Step 3
   */
  downloadPDF() {
  
    this.subscribeService.downloadPDF('2').subscribe(
      (event: HttpEvent<any>) => {

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
    );
  }

}
