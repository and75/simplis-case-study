export interface Activity {
    id:number
    name:string
    coverage:string
    price:number
}
export interface Customer {
    raison_sociale:string
    siret:string
    adresse_postale:string
    email:string
    telephone:number
 }

 export interface Agreement {
    customer: Customer
    activity : Activity
    date: string
    time: string
 }

export interface Subscribe {
    currentStep:number
    validStep:number[]
    activity:Activity|null
    customer:Customer|null
    agreements:number|null
}

export class Subscription implements Subscribe {
    
    currentStep:number
    validStep:number[]
    activity:Activity|null
    customer:Customer|null
    agreements:number|null

    constructor(data: Subscribe) {
        this.currentStep = data.currentStep;
        this.validStep = data.validStep;
        this.activity = data?.activity;
        this.customer = data?.customer;
        this.agreements = data?.agreements;
    }

}
