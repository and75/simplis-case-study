export interface Activity {
    id:number
    name:string
    coverage:string
    price:number
}
export interface Customer {
    id:number|null
    raison_sociale:string
    siret:string
    adresse_postale:string
    email:string
    telephone:number | null
 }

 export interface Agreement {
    id:number|null
    date: string
 }

export interface ApiSubscribe {
    currentStep:number
    validStep:number
    activity:Activity|null
    customer:Customer|null
    agreement:number|null
    treated: boolean
}

export class APISubscription implements ApiSubscribe {
    
    currentStep:number
    validStep:number
    activity:Activity|null
    customer:Customer|null
    agreement:number|null
    treated:boolean

    constructor(data: ApiSubscribe) {
        this.currentStep = data.currentStep;
        this.validStep = data.validStep;
        this.activity = data?.activity;
        this.customer = data?.customer;
        this.agreement = data?.agreement;
        this.treated = data?.treated
    }

}
